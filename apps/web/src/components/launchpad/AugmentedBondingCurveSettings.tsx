import { Box, FormControl, FormLabel, HStack, Input, InputGroup, InputRightAddon, Select, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomInput from "../shared/CustomInput";
import CustomInputRightAddon from "../shared/CustomInputRightAddon";

interface AugmentedBondingCurveSettingsProps {
    onStepCompletionChanged: (completed: boolean) => void;
}

type AugmentedBondingCurveSettings = {
    reserveRatio: number;
    collateralToken: CollateralToken;
    initialReserve: number;
    entryTribute: number;
    exitTribute: number;
}

type CollateralToken = {
    address: string;
    symbol: string;
}

export default function AugmentedBondingCurveSettings({ onStepCompletionChanged }: AugmentedBondingCurveSettingsProps) {

    const [augmentedBondingCurveSettings, setAugmentedBondingCurveSettings] = useState({
        reserveRatio: 0,
        collateralToken: { address: '', symbol: '' },
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
        localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
    };

    const handleCollateralTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedToken = collateralTokenList.find(token => token.symbol === event.target.value);
        if (selectedToken) {
            const updatedSettings = { ...augmentedBondingCurveSettings, collateralToken: selectedToken };
            setAugmentedBondingCurveSettings(updatedSettings);
            localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
        }
    };

    const handleInitialReserveChange = (value: number) => {
        const updatedSettings = { ...augmentedBondingCurveSettings, initialReserve: value };
        setAugmentedBondingCurveSettings(updatedSettings);
        localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
    };

    const handleEntryTributeChange = (value: number) => {
        const updatedSettings = { ...augmentedBondingCurveSettings, entryTribute: value };
        setAugmentedBondingCurveSettings(updatedSettings);
        localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
    };

    const handleExitTributeChange = (value: number) => {
        const updatedSettings = { ...augmentedBondingCurveSettings, exitTribute: value };
        setAugmentedBondingCurveSettings(updatedSettings);
        localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
    };

    useEffect(() => {
        localStorage.getItem('augmentedBondingCurveSettings') && setAugmentedBondingCurveSettings(JSON.parse(localStorage.getItem('augmentedBondingCurveSettings') ?? ''));
    }, []);

    useEffect(() => {
        const isCompleted = augmentedBondingCurveSettings.reserveRatio > 0 && augmentedBondingCurveSettings.collateralToken.symbol.length > 0 && augmentedBondingCurveSettings.initialReserve > 0;
        if (onStepCompletionChanged) {
            onStepCompletionChanged(isCompleted);
        }
    }, [augmentedBondingCurveSettings]);

    return (
        <VStack spacing={4} pt="130px">
            <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Augmented Bonding Curve</Text>
            <Text fontSize="24px" color="brand.900" pt="32px">Configure the DAO's ABC parameters</Text>
            <VStack spacing={3}>
                <FormControl>
                    <FormLabel>Reserve ratio</FormLabel>
                    <InputGroup>
                        <CustomInput value={augmentedBondingCurveSettings.reserveRatio || 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleReserveRatioChange(Number(e.target.value))} type="number" />
                        <CustomInputRightAddon children="%" />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Colateral token</FormLabel>
                    <Select placeholder="Select token" value={augmentedBondingCurveSettings.collateralToken?.symbol || ''} onChange={handleCollateralTokenChange}>
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
                        <CustomInput value={augmentedBondingCurveSettings.initialReserve ?? 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInitialReserveChange(Number(e.target.value))} type="number" />
                        <CustomInputRightAddon children={augmentedBondingCurveSettings.collateralToken?.symbol} />
                    </InputGroup>
                </FormControl>
                <HStack spacing={8}>
                    <FormControl>
                        <FormLabel>Entry tribute</FormLabel>
                        <InputGroup>
                            <CustomInput  value={augmentedBondingCurveSettings.entryTribute ?? 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEntryTributeChange(Number(e.target.value))} type="number" />
                            <CustomInputRightAddon children="%" />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Exit tribute</FormLabel>
                        <InputGroup>
                            <CustomInput value={augmentedBondingCurveSettings.exitTribute ?? 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleExitTributeChange(Number(e.target.value))} type="number" />
                            <CustomInputRightAddon children="%" />
                        </InputGroup>
                    </FormControl>
                </HStack>
            </VStack>
        </VStack>
    );
}
