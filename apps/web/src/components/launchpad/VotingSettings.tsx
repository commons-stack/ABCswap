import { Box, VStack, Text, Input, InputGroup, InputRightAddon, Alert, AlertIcon, HStack, FormControl, FormLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useState } from "react";

interface VotingSettingsProps {
    onVotingSettingsChanged: (data: VotingSettings) => void;
}

type VotingSettings = {
    support: number,
    minApproval: number,
    days: number,
    hours: number,
    minutes: number
}

export default function VotingSettings({ onVotingSettingsChanged }: VotingSettingsProps) {

    const [votingSettings, setVotingSettings] = useState<VotingSettings>({
        support: 50,
        minApproval: 15,
        days: 7,
        hours: 0,
        minutes: 0,
    });

    const handleSupportChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            support: value
        };

        setVotingSettings(updatedSettings);
        onVotingSettingsChanged(updatedSettings);
    };

    const handleMinApprovalChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            minApproval: value
        };

        setVotingSettings(updatedSettings);
        onVotingSettingsChanged(updatedSettings);
    };

    const handleDaysChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            days: value
        };

        setVotingSettings(updatedSettings);
        onVotingSettingsChanged(updatedSettings);
    };

    const handleHoursChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            hours: value
        };

        setVotingSettings(updatedSettings);
        onVotingSettingsChanged(updatedSettings);
    };

    const handleMinutesChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            minutes: value
        };

        setVotingSettings(updatedSettings);
        onVotingSettingsChanged(updatedSettings);
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg" width="50vw">
            <VStack spacing={4}>
                <Text fontSize="2xl" as="b" p="1rem" textAlign="center">Configure template</Text>
                <Text fontSize="xl" as="b" p="1rem" textAlign="center">Choose your voting settings below</Text>

                <FormControl>
                    <FormLabel>Support %</FormLabel>
                    <HStack justifyContent="space-between" width="100%">
                        <Slider
                            aria-label='slider-ex-1'
                            min={0}
                            max={100}
                            value={votingSettings.support}
                            onChange={handleSupportChange}
                            flexGrow={1}
                        >
                            <SliderTrack><SliderFilledTrack /></SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <InputGroup width="20%">
                            <Input
                                value={votingSettings.support ?? 0}
                                onChange={(e) => handleSupportChange(Number(e.target.value))}
                                type="number"
                            />
                            <InputRightAddon children="%" />
                        </InputGroup>
                    </HStack>
                </FormControl>

                <FormControl>
                    <FormLabel>Minimum approval %</FormLabel>
                    <HStack justifyContent="space-between" width="100%">
                        <Slider
                            aria-label='slider-ex-1'
                            min={0}
                            max={100}
                            value={votingSettings.minApproval ?? 0}
                            onChange={handleMinApprovalChange}
                            flexGrow={1}
                        >
                            <SliderTrack><SliderFilledTrack /></SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <InputGroup width="20%">
                            <Input
                                value={votingSettings.minApproval ?? 0}
                                onChange={(e) => handleMinApprovalChange(Number(e.target.value))}
                                type="number"
                            />
                            <InputRightAddon children="%" />
                        </InputGroup>
                    </HStack>
                </FormControl>

                <Text fontSize="sm">Vote duration</Text>
                <HStack>
                    <InputGroup>
                        <Input
                            value={votingSettings.days ?? 0}
                            onChange={(e) => handleDaysChange(Number(e.target.value))}
                            type="number"
                        />
                        <InputRightAddon children="Days" />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            value={votingSettings.hours ?? 0}
                            type="number"
                            onChange={(e) => handleHoursChange(Number(e.target.value))}
                        />
                        <InputRightAddon children="Hours" />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            value={votingSettings.minutes ?? 0}
                            type="number"
                            onChange={(e) => handleMinutesChange(Number(e.target.value))}
                        />
                        <InputRightAddon children="Minutes" />
                    </InputGroup>
                </HStack>

                <Alert status="info" p="1rem">
                    <AlertIcon />
                    <Text fontSize="xs" as="em">The support and minimum approval thresholds are strict requirements, such that votes will only pass if they achieve approval percentages greater than these thresholds.</Text>
                </Alert>
            </VStack>
        </Box>
    );
}
