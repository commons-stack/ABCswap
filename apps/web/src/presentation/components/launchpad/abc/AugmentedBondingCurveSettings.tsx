import { Divider, Box, Button, Flex, FormControl, FormLabel, HStack, Image, InputGroup, Select, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import CustomInput from "../../shared/CustomInput";
import CustomInputRightAddon from "../../shared/CustomInputRightAddon";
import { useABCSettingsModelController } from "./ABCSettingsModelController";

interface AugmentedBondingCurveSettingsProps {
    onStepCompletionChanged: (completed: boolean) => void;
    daoCreationRepository: DAOCreationRepository;
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

export default function AugmentedBondingCurveSettings({ onStepCompletionChanged, daoCreationRepository }: AugmentedBondingCurveSettingsProps) {

    const {
        augmentedBondingCurveSettings,
        collateralTokenList,
        handleReserveRatioChange,
        handleCollateralTokenChange,
        handleInitialReserveChange,
        handleEntryTributeChange,
        handleExitTributeChange
    } = useABCSettingsModelController(daoCreationRepository);

    useEffect(() => {
        const isCompleted = (augmentedBondingCurveSettings.getReserveRatio() ?? 0) > 0 && (augmentedBondingCurveSettings.getCollateralToken()?.getTokenSymbol()?.length ?? 0) > 0 && (augmentedBondingCurveSettings.getReserveInitialBalance() ?? 0) > 0;
        if (onStepCompletionChanged) {
            onStepCompletionChanged(isCompleted);
        }
    }, [augmentedBondingCurveSettings]);

    return (
        <VStack spacing={4} pt="130px">
            <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Augmented Bonding Curve</Text>
            <Text fontSize="24px" color="brand.900" pt="32px">Configure the DAO's ABC parameters</Text>
            <HStack w="100%">
                <VStack spacing={3} minW="320px" maxW="400px" w="35%" alignSelf="start">
                    <HStack alignSelf="start" w="100%">
                        <FormControl w="100%">
                            <FormLabel>
                                <Text fontSize="16px" color="brand.900">RESERVE RATIO</Text>
                            </FormLabel>
                            <HStack justifyContent="space-between">
                                <Button
                                    w="70px"
                                    onClick={() => handleReserveRatioChange("20")}
                                    variant={augmentedBondingCurveSettings.reserveRatio === 20 ? 'solid' : 'outline'}
                                >
                                    20%
                                </Button>
                                <Button
                                    w="70px"
                                    onClick={() => handleReserveRatioChange("50")}
                                    variant={augmentedBondingCurveSettings.reserveRatio === 50 ? 'solid' : 'outline'}
                                >
                                    50%
                                </Button>
                                <Button
                                    w="70px"
                                    onClick={() => handleReserveRatioChange("80")}
                                    variant={augmentedBondingCurveSettings.reserveRatio === 80 ? 'solid' : 'outline'}
                                >
                                    80%
                                </Button>
                                <InputGroup w="91px" display="inline-flex">
                                    <CustomInput rightAddon={true} value={(augmentedBondingCurveSettings.reserveRatio ?? 0).toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleReserveRatioChange(e.target.value)} style={{ pattern: "[0-9]" }} />
                                    <CustomInputRightAddon children="%" />
                                </InputGroup>
                            </HStack>
                        </FormControl>
                    </HStack>
                    <FormControl>
                        <FormLabel>
                            <Text fontSize="16px" color="brand.900">RESERVE INITIAL BALANCE</Text>
                        </FormLabel>
                        <Box>
                            <Flex>
                                <Select placeholder="Select option" borderRight="1px solid" borderColor="brand.900" borderRadius="0" borderTopLeftRadius="15px" borderBottomLeftRadius="15px" value={augmentedBondingCurveSettings.getCollateralToken()?.getTokenSymbol() || ''} onChange={handleCollateralTokenChange}>
                                    {collateralTokenList.map((token) => (
                                        <option key={token.tokenAddress} value={token.tokenSymbol}>
                                            <HStack>
                                                <Image src={token.tokenLogo} boxSize="24px" />
                                                <Text>{token.tokenSymbol}</Text>
                                            </HStack>
                                        </option>
                                    ))}
                                </Select>
                                <CustomInput placeholder="Enter value" borderRadius="15px" borderLeft="0" borderTopLeftRadius="0" borderBottomLeftRadius="0" borderColor="brand.900" value={augmentedBondingCurveSettings.getReserveInitialBalance() ?? 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInitialReserveChange(Number(e.target.value))} type="number" />
                            </Flex>
                        </Box>
                    </FormControl>
                    <HStack spacing={8}>
                        <FormControl>
                            <FormLabel>
                                <Text fontSize="16px" color="brand.900">ENTRY TRIBUTE</Text>
                            </FormLabel>
                            <InputGroup>
                                <CustomInput rightAddon={true} value={augmentedBondingCurveSettings.entryTribute ?? 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEntryTributeChange(Number(e.target.value))} type="number" />
                                <CustomInputRightAddon children="%" />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                <Text fontSize="16px" color="brand.900">EXIT TRIBUTE</Text>
                            </FormLabel>
                            <InputGroup>
                                <CustomInput rightAddon={true} value={augmentedBondingCurveSettings.exitTribute ?? 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleExitTributeChange(Number(e.target.value))} type="number" />
                                <CustomInputRightAddon children="%" />
                            </InputGroup>
                        </FormControl>
                    </HStack>
                </VStack>
            </HStack>
            <Divider paddingTop="24px"
                borderColor="brand.900"
                borderBottomWidth="1px"
                width="100%"
                margin="0 auto"
            />
            <VStack pt="32px">
                <VStack spacing={-1}>
                    <Text fontSize="16px" color="black">When you launch this ABC, that amount specified in the Initial Reserve Balance will be transferred</Text>
                    <Text fontSize="16px" color="black">from your wallet to the Reserve Pool.  You can only proceed if your wallet contains funds equal to or</Text>
                    <Text fontSize="16px" color="black">exceeding the specified Initial Reserve Balance.</Text>
                </VStack>
                <Text fontSize="16px" color="black" pt="16px">The Reserve Ratio is fixed for the life of the ABC and cannot be changed.</Text>
            </VStack>
        </VStack>
    );
}
