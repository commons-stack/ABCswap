import { VStack, Text, InputGroup, HStack, FormControl, FormLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomInput from "../shared/CustomInput";
import CustomInputRightAddon from "../shared/CustomInputRightAddon";

interface VotingSettingsProps {
    onStepCompletionChanged: (completed: boolean) => void;
}

type VotingSettings = {
    support: number,
    minApproval: number,
    days: number,
    hours: number,
    minutes: number
}

export default function VotingSettings({ onStepCompletionChanged }: VotingSettingsProps) {

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
        localStorage.setItem('votingSettings', JSON.stringify(updatedSettings));
        setVotingSettings(updatedSettings);
    };

    const handleMinApprovalChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            minApproval: value
        };
        localStorage.setItem('votingSettings', JSON.stringify(updatedSettings));
        setVotingSettings(updatedSettings);
    };

    const handleDaysChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            days: value
        };
        localStorage.setItem('votingSettings', JSON.stringify(updatedSettings));
        setVotingSettings(updatedSettings);
    };

    const handleHoursChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            hours: value
        };
        localStorage.setItem('votingSettings', JSON.stringify(updatedSettings));
        setVotingSettings(updatedSettings);
    };

    const handleMinutesChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            minutes: value
        };
        localStorage.setItem('votingSettings', JSON.stringify(updatedSettings));
        setVotingSettings(updatedSettings);
    };

    useEffect(() => {
        localStorage.getItem('votingSettings') && setVotingSettings(JSON.parse(localStorage.getItem('votingSettings') ?? ''));
    }, []);

    useEffect(() => {
        const isCompleted = votingSettings.support > 0 && (votingSettings.days > 0 || votingSettings.hours > 0 || votingSettings.minutes > 0)
        if (onStepCompletionChanged) {
            onStepCompletionChanged(isCompleted);
        }
    }, [votingSettings]);

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
                            <CustomInput
                                rightAddon={true}
                                value={votingSettings.support ?? 0}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSupportChange(Number(e.target.value))}
                                type="number"
                            />
                            <CustomInputRightAddon children="%" />
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
                            <CustomInput
                                rightAddon={true}
                                value={votingSettings.minApproval ?? 0}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMinApprovalChange(Number(e.target.value))}
                                type="number"
                            />
                            <CustomInputRightAddon children="%" />
                        </InputGroup>
                    </HStack>
                </FormControl>
                <Text fontSize="16px" color="brand.900" alignSelf="start">VOTE DURATION</Text>
                <HStack spacing={4}>
                    <InputGroup>
                        <CustomInput
                            rightAddon={true}
                            value={votingSettings.days ?? 0}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDaysChange(Number(e.target.value))}
                            type="number"
                        />
                        <CustomInputRightAddon children="Days" />
                    </InputGroup>
                    <InputGroup>
                        <CustomInput
                            rightAddon={true}
                            value={votingSettings.hours ?? 0}
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHoursChange(Number(e.target.value))}
                        />
                        <CustomInputRightAddon children="Hours" />
                    </InputGroup>
                    <InputGroup>
                        <CustomInput
                            rightAddon={true}
                            value={votingSettings.minutes ?? 0}
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMinutesChange(Number(e.target.value))}
                        />
                        <CustomInputRightAddon children="Minutes" />
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
