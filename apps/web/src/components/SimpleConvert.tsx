import { collateral, bonded } from '../../config.json';
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { fetchBalance } from '@wagmi/core'

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

    const [fromToken, setFromToken] = useState<Token>({symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}`});
    const [toToken, setToToken] = useState<Token>({symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}`});

    const [fromTokenBalance, setFromTokenBalance] = useState<string>("0");
    const [fromTokenAmount, setFromTokenAmount] = useState<string>("0");

    const { address, isConnected } = useAccount();

    const handleFromTokenChange = async() => {
        setFromTokenAmount("0");
        if (fromToken.symbol === bonded.symbol) {
            setFromToken({symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}`});
            setToToken({symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}`});
            const balance: TokenBalance = await fetchBalance({
                address: address as `0x${string}`,
                token: fromToken.contract as `0x${string}`,
            })
            setFromTokenBalance(balance.formatted.toString());
        } else {
            setFromToken({symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}`});
            setToToken({symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}`});
            const balance = await fetchBalance({
                address: address as `0x${string}`,
                token: fromToken.contract as `0x${string}`,
            })
            setFromTokenBalance(balance.formatted?.toString());
        }
    };

    const handleConvert = () => {
        
    };

    useEffect(() => {
        // TODO get amount of ToToken

    }, [fromTokenAmount]);

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
                }}/>
                {isConnected && <Text>{fromTokenBalance + " " + fromToken.symbol }</Text>}
                <Button onClick={() => setFromTokenAmount(fromTokenBalance)}>Convert all</Button>
            </Flex>
            {/* Middle Section */}
            <Flex flex="0.1" bg="red.100" direction="column" justifyContent="center">
                <Button onClick={handleFromTokenChange}>Change from/to</Button>
            </Flex>
            {/* Bottom Section */}
            <Flex flex="1" bg={toToken.bgColor} direction="column" justifyContent="center">
                <Text>{toToken.symbol}</Text>
                <Input isDisabled />
            </Flex>
            <Flex flex="0.1" bg="red.100" direction="column" justifyContent="center">
                <Button onClick={handleConvert}>Convert</Button>
            </Flex>
        </Flex>
    );
}