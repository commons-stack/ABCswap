import {
    Box,
    Button,
    Step,
    StepDescription,
    StepIndicator,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    VStack,
    useSteps,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { collateral, bonded } from '../../config.json';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { knownContracts } from '../../config.json';
import bondingCurveAbi from '../../utils/abi/augmented-bonding-curve.json';
import tokenAbi from '../../utils/abi/token.json';
import { Abi, parseEther, parseGwei, parseUnits } from 'viem';

type TransactionProps = {
    account: `0x${string}` | undefined,
    fromAmount: string,
    toSymbol: string,
}

type Steps = {
    title: string,
    description: string
}

export default function Transaction({ account, fromAmount, toSymbol}: TransactionProps) {

    const [steps, setSteps] = useState<Array<Steps>>([]);

    let transact = true;

    useEffect(() => {
        if (toSymbol === bonded.symbol) {
            setSteps([
                { title: 'Raise approval', description: 'Waiting for signature' },
                { title: 'Make buy order', description: 'Waiting for signature' }
            ]);
            buyOrder();
        } else if (toSymbol === collateral.symbol) {
            setSteps([
                { title: 'Make sell order', description: 'Waiting for signature' }
            ]);
            sellOrder();
        }
    }, [toSymbol]);

    const { activeStep, goToNext } = useSteps({
        index: 0,
        count: steps.length,
    })

    const buyOrder = async () => {
        if(transact) {
            transact = false; // Used to prevent multiple transactions automatically appearing
            // Raise approval
            const config = await prepareWriteContract({
                address: knownContracts[100].COLLATERAL_TOKEN as `0x${string}`,
                abi: tokenAbi as Abi,
                functionName: 'approve',
                args: [
                    account as `0x${string}`,
                    parseUnits(fromAmount, 18)
                ]
            });

            const tx = await writeContract(config);
            const data = await waitForTransaction(tx);
            console.log(data)
            if(data.status === "success") {
                goToNext();
                // Make buy order

                const config = await prepareWriteContract({
                    address: knownContracts[100].BONDING_CURVE as `0x${string}`,
                    abi: bondingCurveAbi as Abi,
                    functionName: 'makeBuyOrder',
                    args: [
                        account as `0x${string}`,
                        knownContracts[100].COLLATERAL_TOKEN as `0x${string}`,
                        parseUnits(fromAmount, 18),
                        parseUnits("0", 18)
                    ],
                    value: parseEther("0"),
                    maxFeePerGas: parseGwei("100"),
                    
                });

                const tx = await writeContract(config)
                console.log(tx) 
                
            }
        }
    }

    const sellOrder = async () => {
        if(transact) {
            transact = false; // Used to prevent multiple transactions automatically appearing
            const config = await prepareWriteContract({
                address: knownContracts[100].BONDING_CURVE as `0x${string}`,
                abi: bondingCurveAbi as Abi,
                functionName: 'makeSellOrder',
                args: [
                    account as `0x${string}`,
                    knownContracts[100].COLLATERAL_TOKEN as `0x${string}`,
                    parseUnits(fromAmount, 18),
                    parseUnits("0", 18)
                ]
            });
    
            const tx = await writeContract(config);
            console.log(tx);
            if(tx) {
                goToNext();
            }
        }
    }

    return (
        <>
            <Stepper size='lg' colorScheme='blue' index={activeStep}>
                {steps.map((stepInfo, index) => (
                    <Step key={index}>
                        <VStack>
                            <StepIndicator>
                                <StepStatus complete={`✅`} active={`📍`} />
                            </StepIndicator>
                            <Box flexShrink='0'>
                                <StepTitle>{stepInfo.title}</StepTitle>
                                <StepDescription>{stepInfo.description}</StepDescription>
                            </Box>
                            <StepSeparator />
                        </VStack>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}
