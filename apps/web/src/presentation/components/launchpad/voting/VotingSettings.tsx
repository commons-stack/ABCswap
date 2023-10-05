import { FormControl, FormLabel, HStack, InputGroup, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack, Image, Divider, Tooltip } from "@chakra-ui/react";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import CustomInput from "../../../../../../shared/presentation/components/CustomInput";
import CustomInputRightAddon from "../../../../../../shared/presentation/components/CustomInputRightAddon";
import { useVotingSettingsModelController } from "./VotingSettingsModelController";
import "../../../../styles.css";

interface VotingSettingsProps {
    onStepCompletionChanged: (completed: boolean) => void;
    daoCreationRepository: DAOCreationRepository;
}

export default function VotingSettings({ onStepCompletionChanged, daoCreationRepository }: VotingSettingsProps) {

    const {
        handleSupportChange,
        handleMinApprovalChange,
        handleDaysChange,
        handleHoursChange,
        handleMinutesChange,
        votingSettings
    } = useVotingSettingsModelController(onStepCompletionChanged, daoCreationRepository);

    return (
        <VStack spacing={4} pt="130px" className="abcs-newdao-step-content">
            <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Voting</Text>
            <Text fontSize="24px" color="brand.900" pt="32px">Choose your voting settings below</Text>
            <Divider paddingTop="24px"
                borderColor="brand.900"
                borderBottomWidth="1px"
                width="100%"
                margin="0 auto"
            />
            <VStack width="90%">
                <FormControl pt="34px" pb="32px">
                    <FormLabel>
                        <HStack>
                            <Text fontSize="16px" color="brand.900">SUPPORT</Text>
                            <Tooltip label="Support is the relative percentage of tokens that are required to vote “Yes” for a proposal to be approved. For example, if “Support” is set to 50%, then more than 50% of the tokens used to vote on a proposal must vote “Yes” for it to pass.">
                                <Image src="../../../../public/InformationIcon.svg" boxSize="16px" />
                            </Tooltip>
                        </HStack>
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
                        <InputGroup width="20%" ml="10px">
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
                        <HStack>
                            <Text fontSize="16px" color="brand.900">MINIMUM APPROVAL</Text>
                            <Tooltip label="Minimum approval is the percentage of the total token supply that is required to vote “Yes” on a proposal before it can be approved. For example, if the “Minimum Approval” is set to 20%, then more than 20% of the outstanding token supply must vote “Yes” on a proposal for it to pass.">
                                <Image src="../../../../public/InformationIcon.svg" boxSize="16px" />
                            </Tooltip>
                        </HStack>
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
                        <InputGroup width="20%" ml="10px">
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
                <HStack alignSelf="start" mt="38px">
                    <Text fontSize="16px" color="brand.900">VOTE DURATION</Text>
                    <Tooltip label="Vote duration is the length of time that the vote will be open for participation. For example, if the Vote Duration is set to 24 hours, then token holders have 24 hours to participate in the vote.">
                    <Image src="../../../../public/InformationIcon.svg" boxSize="16px" />
                    </Tooltip>
                </HStack>
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
            </VStack>
            <Divider paddingTop="24px"
                borderColor="brand.900"
                borderBottomWidth="1px"
                width="100%"
                margin="0 auto"
            />
            <VStack pt="32px" spacing={-1}>
                <Text fontSize="16px" color="black">All votes must reach the support and minimum approval threshold in order to pass. </Text>
                <Text fontSize="16px" color="black">If one of both are not met, the vote will not be considered valid and will not be executed.</Text>
            </VStack>
        </VStack>
    );
}
