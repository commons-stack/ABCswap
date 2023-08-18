import { collateral, bonded } from '../../config.json';
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";

export default function SimpleConvert() {

    type Token = {
        symbol: string,
        bgColor?: string,
        contract: `0x${string}`,
    }

    const [fromToken, setFromToken] = useState<Token>({symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}`});
    const [toToken, setToToken] = useState<Token>({symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}`});

    const [fromTokenBalance, setFromTokenBalance] = useState<string>("0");
    const [fromTokenAmount, setFromTokenAmount] = useState<string>("0");

    const { address, isConnected } = useAccount();

    const handleFromTokenChange = () => {
        if (fromToken.symbol === bonded.symbol) {
            setFromToken({symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}`});
            setToToken({symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}`});
        } else {
            setFromToken({symbol: bonded.symbol, bgColor: "blue.100", contract: bonded.contract as `0x${string}`});
            setToToken({symbol: collateral.symbol, bgColor: "green.100", contract: collateral.contract as `0x${string}`});
        }

        const { data, isError, isLoading } = useBalance({
            address: address,
            token: fromToken.contract,
        });

        setFromTokenAmount("0");
        !isLoading && !isError ? setFromTokenBalance(data?.formatted.toString() || "0") : undefined;
    };

    const handleConvert = () => {
        
    };

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