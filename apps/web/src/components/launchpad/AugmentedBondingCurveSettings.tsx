import { Box, FormControl, FormLabel, HStack, Input, InputGroup, InputRightAddon, Select, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

interface AugmentedBondingCurveSettingsProps {
    onAugmentedBondingCurveSettingsChanged: (data: AugmentedBondingCurveSettings) => void;
}

type AugmentedBondingCurveSettings = {
    reserveRatio: number;
    colateralToken: CollateralToken;
    initialReserve: number;
    entryTribute: number;
    exitTribute: number;
}

type CollateralToken = {
    address: string;
    symbol: string;
}

export default function AugmentedBondingCurveSettings({onAugmentedBondingCurveSettingsChanged}: AugmentedBondingCurveSettingsProps) {

    const [augmentedBondingCurveSettings, setAugmentedBondingCurveSettings] = useState({
        reserveRatio: 0,
        colateralToken: { address: '', symbol: '' },
        initialReserve: 0,
        entryTribute: 0,
        exitTribute: 0,
    });

    const collateralTokenList = [
        { address: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d", symbol: "WXDAI" },
        { address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83", symbol: "USDC" },
        { address: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb", symbol: "GNO" },
        { address: "0x4f4F9b8D5B4d0Dc10506e5551B0513B61fD59e75", symbol: "GIV" },
    ];

    const handleReserveRatioChange = (value: number) => {
        const updatedSettings = { ...augmentedBondingCurveSettings, reserveRatio: value };
        setAugmentedBondingCurveSettings(updatedSettings);
        onAugmentedBondingCurveSettingsChanged(updatedSettings);
    };

    const handleColateralTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedToken = collateralTokenList.find(token => token.symbol === event.target.value);
        if (selectedToken) {
            const updatedSettings = { ...augmentedBondingCurveSettings, colateralToken: selectedToken };
            setAugmentedBondingCurveSettings(updatedSettings);
            onAugmentedBondingCurveSettingsChanged(updatedSettings);
        }
    };

    const handleInitialReserveChange = (value: number) => {
        const updatedSettings = { ...augmentedBondingCurveSettings, initialReserve: value };
        setAugmentedBondingCurveSettings(updatedSettings);
        onAugmentedBondingCurveSettingsChanged(updatedSettings);
    };

    const handleEntryTributeChange = (value: number) => {
        const updatedSettings = { ...augmentedBondingCurveSettings, entryTribute: value };
        setAugmentedBondingCurveSettings(updatedSettings);
        onAugmentedBondingCurveSettingsChanged(updatedSettings);
    };

    const handleExitTributeChange = (value: number) => {
        const updatedSettings = { ...augmentedBondingCurveSettings, exitTribute: value };
        setAugmentedBondingCurveSettings(updatedSettings);
        onAugmentedBondingCurveSettingsChanged(updatedSettings);
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg" width="50vw">
            <VStack spacing={4}>
                <Text fontSize="2xl" as="b" p="1rem" textAlign="center">Configure template</Text>
                <Text fontSize="xl" as="b" p="1rem" textAlign="center">Choose your bonding curve settings below</Text>
                <VStack spacing={3}>
                    <FormControl>
                        <FormLabel>Reserve ratio</FormLabel>
                        <InputGroup>
                            <Input value={augmentedBondingCurveSettings.reserveRatio || 0} onChange={(e) => handleReserveRatioChange(Number(e.target.value))} type="number" />
                            <InputRightAddon children="%" />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Colateral token</FormLabel>
                        <Select placeholder="Select token" value={augmentedBondingCurveSettings.colateralToken?.symbol || ''} onChange={handleColateralTokenChange}>
                            {collateralTokenList.map((token) => (
                                <option key={token.address} value={token.symbol}>
                                    {token.symbol}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Initial reserve token</FormLabel>
                        <InputGroup>
                            <Input value={augmentedBondingCurveSettings.initialReserve ?? 0} onChange={(e) => handleInitialReserveChange(Number(e.target.value))} type="number" />
                            <InputRightAddon children={augmentedBondingCurveSettings.colateralToken?.symbol} />
                        </InputGroup>
                    </FormControl>
                    <HStack spacing={8}>
                        <FormControl>
                            <FormLabel>Entry tribute</FormLabel>
                            <InputGroup>
                                <Input value={augmentedBondingCurveSettings.entryTribute ?? 0} onChange={(e) => handleEntryTributeChange(Number(e.target.value))} type="number" />
                                <InputRightAddon children="%" />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Exit tribute</FormLabel>
                            <InputGroup>
                                <Input value={augmentedBondingCurveSettings.exitTribute ?? 0} onChange={(e) => handleExitTributeChange(Number(e.target.value))} type="number" />
                                <InputRightAddon children="%" />
                            </InputGroup>
                        </FormControl>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    );
}
