import { Box, VStack, Text, Input, InputGroup, InputRightAddon, Alert, AlertIcon, HStack, FormControl, FormLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Divider } from "@chakra-ui/react";
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
        <VStack spacing={4} pt="130px">
            <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Voting</Text>
            <Text fontSize="24px" color="brand.900" pt="32px">Choose your voting settings below</Text>
            <VStack width="80%">
                <FormControl pt="34px" pb="32px">
                    <FormLabel>
                        <Text fontSize="16px" color="brand.900">SUPPORT</Text>
                    </FormLabel>                    
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
                    <FormLabel>
                        <Text fontSize="16px" color="brand.900">MINIMUM APPROVAL</Text>
                    </FormLabel>
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
                <Text fontSize="16px" color="brand.900" alignSelf="start">VOTE DURATION</Text>
                <HStack spacing={4}>
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
                <VStack pt="32px">
                    <Text fontSize="16px" color="brand.900">All votes must reach the support and minimum approval threshold in order to pass. </Text>
                    <Text fontSize="16px" color="brand.900">If one of both are not met, the vote will not be considered valid and will not be executed.</Text>
                </VStack>
            </VStack>
        </VStack>
    );
}
