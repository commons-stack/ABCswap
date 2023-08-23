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

    type TokenBalance = {
        decimals: number,
        formatted: string,
        symbol: string,
        value: BigInt
    }

    const [bondedTokenBalance, setBondedTokenBalance] = useState<bigint>(0n)
    const [collateralTokenBalance, setCollateralTokenBalance] = useState<bigint>(0n)

    const [fromToken, setFromToken] = useState<Token>({ symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}` });
    const [toToken, setToToken] = useState<Token>({ symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}` });

    const [fromTokenBalance, setFromTokenBalance] = useState<string>("0");
    const [fromTokenAmount, setFromTokenAmount] = useState<string>("0");

    const [toTokenAmount, setToTokenAmount] = useState<string>("0");

    const [isTransacting, setIsTransacting] = useState<boolean>(false);

    const { address, isConnected } = useAccount();

    const handleFromTokenChange = async () => {
        setFromTokenAmount("0");
        if (fromToken.symbol === bonded.symbol) {
            setFromToken({ symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}` });
            setToToken({ symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}` });
            if (address) {
                const balance: TokenBalance = await fetchBalance({
                    address: address as `0x${string}`,
                    token: fromToken.contract as `0x${string}`,
                })
                setFromTokenBalance(balance.formatted.toString());
            }
        } else {
            setFromToken({ symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}` });
            setToToken({ symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}` });
            if (address) {
                const balance = await fetchBalance({
                    address: address as `0x${string}`,
                    token: fromToken.contract as `0x${string}`,
                })
                setFromTokenBalance(balance.formatted?.toString());
            }
        }
    };

    const handleConvert = async() => {
        setIsTransacting(true);
    };

    useEffect(() => {
        (async() => {
            if (isConnected) {
                const balance: TokenBalance = await fetchBalance({
                    address: address as `0x${string}`,
                    token: fromToken.contract as `0x${string}`,
                })
                setFromTokenBalance(balance.formatted.toString());
            } else {
                setFromTokenBalance("0");
            }

            const [, virtualBalance, virtualSupply, reserveRatio ] = await getCollateral();
            const [sellFeePct, buyFeePct] = await getTributePcts();
               
            const amountAsBigInt = parseUnits(fromTokenAmount, 18)
        
            const forwards = fromToken.symbol === "TEC" ? false : true;

            const returnedAmount = await getBondingCurvePrice({
                amount: amountAsBigInt,
                entryTribute: sellFeePct,
                exitTribute: buyFeePct,
                virtualBalance: virtualBalance,
                virtualSupply: virtualSupply,
                reserveRatio: reserveRatio,
                forwards: forwards
            }) as bigint;

            setToTokenAmount(formatUnits(returnedAmount, 18));

        })();
        // TODO get amount of ToToken
    }, [isConnected, fromTokenAmount]);

    useEffect(() => {

    }, []);

    if(isTransacting) {
        return <Transaction fromAmount={fromTokenAmount} toAmount={toTokenAmount} />
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
                <Text>{toTokenAmount}</Text>
                <Text>{toToken.symbol}</Text>
            </Flex>
            <Flex flex="0.1" bg="red.100" direction="column" justifyContent="center">
                <Button onClick={handleConvert}>Convert</Button>
            </Flex>
        </Flex>
    );
}