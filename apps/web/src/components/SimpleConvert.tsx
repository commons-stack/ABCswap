import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useBalance } from "wagmi";

export default function SimpleConvert() {

    type Token = {
        symbol: string,
        bgColor: string,
    }

    const [fromToken, setFromToken] = useState<Token>({symbol: "TEC", bgColor: "blue.100"});
    const [toToken, setToToken] = useState<Token>({symbol: "WXDAI", bgColor: "green.100"});

    const [fromTokenAmount, setFromTokenAmount] = useState<string>("0");

    const handleFromTokenChange = () => {
        setFromTokenAmount("0");
        if (fromToken.symbol === "TEC") {
            setFromToken({symbol: "WXDAI", bgColor: "green.100"});
            setToToken({symbol: "TEC", bgColor: "blue.100"});
        } else {
            setFromToken({symbol: "TEC", bgColor: "blue.100"});
            setToToken({symbol: "WXDAI", bgColor: "green.100"});
        }
    };

    const handleEntireBalance = () => {
        useBalance();
    }

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
                <Button onClick={handleEntireBalance}>Convert all</Button>
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