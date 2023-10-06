import { collateral, bonded } from '../../../../shared/config.json';
import { Button, Checkbox, Flex, Input, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { fetchBalance } from '@wagmi/core';
import { getCollateral } from '../../../../shared/utils/getCollateral';
import { getBondingCurvePrice } from '../../utils/getBondingCurvePrice';
import { getTributePcts } from '../../utils/getTributePcts';
import { formatEther, formatUnits, parseUnits } from 'viem';
import Transaction from './TransactionModal';

import useProcessTransactions from '../../../../shared/presentation/hooks/useProcessTransactions';
import useConvertSteps from '../../../../shared/presentation/hooks/useConvertSteps';

import { Image, VStack, HStack, Box, InputGroup } from "@chakra-ui/react";
import CustomInput from '../../../../shared/presentation/components/CustomInput';
import CustomInputRightAddon from '../../../../shared/presentation/components/CustomInputRightAddon';

interface SwapHomeProps {
    dao: string;
}

export default function SimpleConvert({ dao }: SwapHomeProps) {

    type Token = {
        symbol: string,
        bgColor?: string,
        contract: `0x${string}`,
    }

    type CollateralData = {
        virtualBalance: bigint,
        virtualSupply: bigint,
        reserveRatio: number
    }

    type TributePcts = {
        sellFeePct: bigint,
        buyFeePct: bigint
    }

    const [collateralData, setCollateralData] = useState<CollateralData>({ virtualBalance: 0n, virtualSupply: 0n, reserveRatio: 0 });
    const [tributePcts, setTributePcts] = useState<TributePcts>({ sellFeePct: 0n, buyFeePct: 0n });

    const [estimatedReturn, setEstimatedReturn] = useState<string>("0");

    const [bondedTokenBalance, setBondedTokenBalance] = useState<bigint>(0n)
    const [collateralTokenBalance, setCollateralTokenBalance] = useState<bigint>(0n)

    const [fromToken, setFromToken] = useState<Token>({ symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}` });
    const [toToken, setToToken] = useState<Token>({ symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}` });

    const [fromTokenBalance, setFromTokenBalance] = useState<string>("0");
    const [fromTokenAmount, setFromTokenAmount] = useState<string>("0");

    const { address, isConnected } = useAccount();

    const handleFromTokenChange = async () => {
        setFromTokenAmount("0");
        setEstimatedReturn("0");
        if (fromToken.symbol === bonded.symbol) {
            setFromToken({ symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}` });
            setToToken({ symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}` });
            setFromTokenBalance(formatUnits(collateralTokenBalance, 18));
        } else {
            setFromToken({ symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}` });
            setToToken({ symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}` });
            setFromTokenBalance(formatUnits(bondedTokenBalance, 18));
        }
    };

    // Retrieve balances from the user's wallet
    useEffect(() => {
        (async () => {
            if (address) {
                const bondedBalance = await fetchBalance({
                    address: address as `0x${string}`,
                    token: bonded.contract as `0x${string}`,
                })
                setBondedTokenBalance(bondedBalance.value);

                const collateralBalance = await fetchBalance({
                    address: address as `0x${string}`,
                    token: collateral.contract as `0x${string}`,
                })
                setCollateralTokenBalance(collateralBalance.value);
            }
        })();
    }, [address, isConnected]);

    // Retrieve multiplier to calculate estimated return
    useEffect(() => {
        (async () => {
            const [, virtualBalance, virtualSupply, reserveRatio] = await getCollateral();

            const [sellFeePct, buyFeePct] = await getTributePcts();

            setCollateralData({ virtualBalance, virtualSupply, reserveRatio });
            setTributePcts({ sellFeePct, buyFeePct });

        })();
    }, []);



    // Calculate estimated return
    const calculateEstimatedReturn = async (amount: string) => {
        const parsedAmount = parseFloat(amount);
        if (!parsedAmount) {
            setEstimatedReturn("0")
            return;
        } else {
            const amountAsBigInt = parseUnits(amount, 18);
            if (fromToken.symbol === bonded.symbol) {

                const bondedToCollateral = await getBondingCurvePrice({
                    amount: amountAsBigInt,
                    entryTribute: tributePcts.sellFeePct,
                    exitTribute: tributePcts.buyFeePct,
                    virtualBalance: collateralData.virtualBalance,
                    virtualSupply: collateralData.virtualSupply,
                    reserveRatio: collateralData.reserveRatio,
                    forwards: false
                }) as bigint;

                setEstimatedReturn(formatUnits(bondedToCollateral, 18));

            } else {

                const collateralToBonded = await getBondingCurvePrice({
                    amount: amountAsBigInt,
                    entryTribute: tributePcts.sellFeePct,
                    exitTribute: tributePcts.buyFeePct,
                    virtualBalance: collateralData.virtualBalance,
                    virtualSupply: collateralData.virtualSupply,
                    reserveRatio: collateralData.reserveRatio,
                    forwards: true
                }) as bigint;

                setEstimatedReturn(formatUnits(collateralToBonded, 18));
            }
        }
    }

    const { processTransactions } = useProcessTransactions();

    const steps = useConvertSteps(toToken.symbol, fromTokenAmount, address, bonded as { symbol: string; contract: `0x${string}`; });

    if (true) {
        return (
            <VStack bg="brand.100" pb="100px">
                <VStack spacing={4}>
                    <Text color="brand.900" fontSize="24px" fontFamily="VictorSerifTrial">Your DAO</Text>
                    <InputGroup mt="24px">
                        <CustomInput
                            w="408px"
                            h="48px"
                            rightAddon={true}
                            placeholder="Type an organization name"
                            value={dao ?? ''}
                            disabled
                        />
                        <CustomInputRightAddon h="48px">
                            <Image src="../../../../public/Check.svg" boxSize="24px" />
                        </CustomInputRightAddon>
                    </InputGroup>
                </VStack>
                <HStack w="949px" h="97px" borderRadius="16px" bgColor="brand.300" mt="32px">
                    <Box w="50%" ml="23px" border="1px solid" borderColor="brand.1000" bgColor="brand.1100" borderRadius="8px">
                        <Text p="12px">TOKEN PRICE INFO</Text>
                    </Box>
                    <Box w="25%" border="1px solid" borderColor="brand.1000" bgColor="brand.1100" borderRadius="8px">
                        <HStack p="12px" justifyContent="space-between">
                            <HStack>
                                <Text>Entry Tribute</Text>
                                <Tooltip>
                                    <Image src="InformationIcon.svg"></Image>
                                </Tooltip>
                            </HStack>
                            <Text>0%</Text>
                        </HStack>
                    </Box>
                    <Box w="25%" mr="23px" border="1px solid" borderColor="brand.1000" bgColor="brand.1100" borderRadius="8px">
                        <HStack p="12px" justifyContent="space-between">
                            <HStack>
                                <Text>Exit Tribute</Text>
                                <Tooltip>
                                    <Image src="InformationIcon.svg"></Image>
                                </Tooltip>
                            </HStack>
                            <Text>0%</Text>
                        </HStack>
                    </Box>
                </HStack>
                <VStack w="949px" h="446px" borderRadius="16px" bgColor="brand.300" mt="16px">
                    <HStack>
                        <Box w="452px" h="268px" mt="31px" ml="19px" bgColor="white" borderRadius="16px">
                            <Text mt="24px" ml="31px">You Send</Text>
                            <HStack w="106px" h="40px" ml="26px" mt="16px" border="1px solid black" borderRadius="30px" justifyContent="center">
                                <Image w="25px" h="25px" />
                                <Text color="brand.900">{fromToken.symbol}</Text>
                            </HStack>
                            <Input w="300px" ml="10px" mt="50px" fontSize="50px" border="none" placeholder='0'></Input>
                            <HStack ml="26px" mt="8px">
                                <Text fontSize="14px">Balance: {formatEther(bondedTokenBalance)}</Text>
                                <Text as="b" fontSize="14px">Max</Text>
                            </HStack>
                        </Box>
                        <Box w="452px" h="268px" mt="31px" mr="19px" bgColor="white" borderRadius="16px">
                            <Text mt="24px" mr="31px" textAlign="right">You Receive</Text>
                            <HStack w="106px" h="40px" mr="26px" mt="16px" border="1px solid black" borderRadius="30px" justifyContent="center" marginLeft="auto">
                                <Image w="25px" h="25px" />
                                <Text color="brand.900">{toToken.symbol}</Text>
                            </HStack>
                            <Flex direction="column" align="flex-end" mr="26px" mt="8px">
                                <Input w="300px" mt="50px" fontSize="50px" border="none" placeholder='0' textAlign="right" />
                                <HStack mt="8px">
                                    <Text fontSize="14px">100$</Text>
                                </HStack>
                            </Flex>
                        </Box>
                    </HStack>

                    <Button w="912px" h="61px" borderRadius="8px">
                        <Text as="b" color="white">Convert</Text>
                    </Button>
                    <HStack>
                        <Checkbox />
                        <Text mt="26px" as="b">By clicking on “Convert” you are accepting these terms</Text>
                    </HStack>
                </VStack>
            </VStack>
        )
    }

    return (
        <>
            <Flex height="100vh" direction="column">
                {/* Top Section */}
                <Flex flex="1" bg={fromToken.bgColor} direction="column" justifyContent="center">
                    <Text>{fromToken.symbol}</Text>
                    <Input value={fromTokenAmount} onChange={(e) => {
                        const inputValue = e.target.value;

                        if (/^\d*\.?\d*$/.test(inputValue)) {
                            setFromTokenAmount(inputValue);
                            calculateEstimatedReturn(inputValue);
                        }
                    }} />
                    {isConnected && <Text>{fromTokenBalance + " " + fromToken.symbol}</Text>}
                    <Button onClick={() => setFromTokenAmount(fromTokenBalance)}>Convert all</Button>
                </Flex>
                {/* Middle Section */}
                <Flex flex="0.1" bg="red.100" direction="column" justifyContent="center">
                    <Button onClick={handleFromTokenChange}>Change from/to</Button>
                </Flex>
                {/* Bottom Section */}
                <Flex flex="1" bg={toToken.bgColor} direction="column" justifyContent="center">
                    <Text>{estimatedReturn}</Text>
                    <Text>{toToken.symbol}</Text>
                </Flex>
                <Flex flex="0.1" bg="red.100" direction="column" justifyContent="center">
                    <Button bg="brand.cs-wisdom" onClick={() => processTransactions(steps)} isDisabled={!address}>Convert</Button>
                </Flex>
            </Flex>
            <Transaction />
        </>
    );
}