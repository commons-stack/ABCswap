import { collateral, bonded } from '../../config.json';
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { fetchBalance } from '@wagmi/core';
import { getCollateral } from './../../utils/getCollateral';
import { getBondingCurvePrice } from './../../utils/getBondingCurvePrice';
import { getTributePcts } from './../../utils/getTributePcts';
import { formatUnits, parseUnits } from 'viem';
import Transaction from './Transaction';

export default function SimpleConvert() {

    type Token = {
        symbol: string,
        bgColor?: string,
        contract: `0x${string}`,
    }

    const [collateralMultiplier, setCollateralMultiplier] = useState<bigint>(0n);
    const [bondedMultiplier, setBondedMultiplier] = useState<bigint>(0n);
    const [estimatedReturn, setEstimatedReturn] = useState<string>("0");

    const [bondedTokenBalance, setBondedTokenBalance] = useState<bigint>(0n)
    const [collateralTokenBalance, setCollateralTokenBalance] = useState<bigint>(0n)

    const [fromToken, setFromToken] = useState<Token>({ symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}` });
    const [toToken, setToToken] = useState<Token>({ symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}` });

    const [fromTokenBalance, setFromTokenBalance] = useState<string>("0");
    const [fromTokenAmount, setFromTokenAmount] = useState<string>("0");

    const [isTransacting, setIsTransacting] = useState<boolean>(false);

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

    const handleConvert = async () => {
        setIsTransacting(true);
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

            const amountAsBigInt = parseUnits("1", 18)

            const bondedToCollateral = await getBondingCurvePrice({
                amount: amountAsBigInt,
                entryTribute: sellFeePct,
                exitTribute: buyFeePct,
                virtualBalance: virtualBalance,
                virtualSupply: virtualSupply,
                reserveRatio: reserveRatio,
                forwards: false
            }) as bigint;

            const collateralToBonded = await getBondingCurvePrice({
                amount: amountAsBigInt,
                entryTribute: sellFeePct,
                exitTribute: buyFeePct,
                virtualBalance: virtualBalance,
                virtualSupply: virtualSupply,
                reserveRatio: reserveRatio,
                forwards: true
            }) as bigint;

            setBondedMultiplier(bondedToCollateral);
            setCollateralMultiplier(collateralToBonded);
        })();
    }, []);

    // Calculate estimated return
    const calculateEstimatedReturn = (amount: string) => {
        const parsedAmount = parseFloat(amount);
        if(!parsedAmount) {
            setEstimatedReturn("0")
            return;
        } else {
            const amountAsBigInt = BigInt(parseFloat(amount));
            if (fromToken.symbol === bonded.symbol) {
                setEstimatedReturn(formatUnits(amountAsBigInt * bondedMultiplier, 18));
            } else {
                setEstimatedReturn(formatUnits(amountAsBigInt * collateralMultiplier, 18));
            }
        }
    }

    if (isTransacting) {
        console.log("Transacting");
    }

    return (
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
                <Button onClick={handleConvert}>Convert</Button>
            </Flex>
        </Flex>
    );
}