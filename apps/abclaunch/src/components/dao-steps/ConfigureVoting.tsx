import { InputGroup, Input, InputRightAddon, Text, VStack, Divider, FormControl, FormLabel, HStack, Tooltip, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { newDaoVotingState } from "../../recoil";
import { useRecoilState } from "recoil";

function SliderControl({name, value, onChange, tooltip}: {name: string, tooltip: string, value: string, onChange: (value: string) => void }) {
    return (
        <FormControl pt="34px" pb="32px">
            <FormLabel>
                <HStack>
                    <Text fontSize="16px" color="brand.900">{name}</Text>
                    <Tooltip label={tooltip}>
                        <InfoOutlineIcon />
                    </Tooltip>
                </HStack>
            </FormLabel>
            <HStack justifyContent="space-between" width="100%">
                <Slider
                    aria-label='slider-ex-1'
                    min={0}
                    max={100}
                    value={Number(value)}
                    onChange={value => onChange(value.toString())}
                    flexGrow={1}
                    focusThumbOnChange={false}
                >
                    <SliderTrack><SliderFilledTrack /></SliderTrack>
                    <SliderThumb />
                </Slider>
                <InputGroup width="20%" ml="10px">
                    <Input
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                        type="number"
                    />
                    <InputRightAddon children="%" />
                </InputGroup>
            </HStack>
        </FormControl>
    )
}

export default function ConfigureVoting() { 

    const [votingSettings, setVotingSettings] = useRecoilState(newDaoVotingState);

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
                <SliderControl name="SUPPORT" value={votingSettings.supportRequired} onChange={supportRequired => setVotingSettings(settings => ({...settings, supportRequired}))} tooltip="Support is the relative percentage of tokens that are required to vote “Yes” for a proposal to be approved. For example, if “Support” is set to 50%, then more than 50% of the tokens used to vote on a proposal must vote “Yes” for it to pass." />
                <SliderControl name="MINIMUM APPROVAL" value={votingSettings.minimumAcceptanceQuorum} onChange={minimumAcceptanceQuorum => setVotingSettings(settings => ({...settings, minimumAcceptanceQuorum}))} tooltip="Minimum approval is the percentage of the total token supply that is required to vote “Yes” on a proposal before it can be approved. For example, if the “Minimum Approval” is set to 20%, then more than 20% of the outstanding token supply must vote “Yes” on a proposal for it to pass." />
                <HStack alignSelf="start" mt="38px">
                    <Text fontSize="16px" color="brand.900">VOTE DURATION</Text>
                    <Tooltip label="Vote duration is the length of time that the vote will be open for participation. For example, if the Vote Duration is set to 24 hours, then token holders have 24 hours to participate in the vote.">
                        <InfoOutlineIcon />
                    </Tooltip>
                </HStack>
                <HStack spacing={4}>
                    {['Days', 'Hours', 'Minutes'].map((key, index) => {
                        return (
                            <InputGroup key={index}>
                                <Input
                                    value={(votingSettings[`voteDuration${key}` as 'voteDurationDays' | 'voteDurationHours' | 'voteDurationMinutes'])}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVotingSettings(settings => ({...settings, [`voteDuration${key}`]: e.target.value}))}
                                />
                                <InputRightAddon children={key} />
                            </InputGroup>
                        )
                    })}
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
