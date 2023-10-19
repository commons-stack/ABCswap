import { InputGroup, Input, InputRightElement, Text, VStack, Divider, FormControl, FormLabel, HStack, Tooltip, Slider, SliderTrack, SliderFilledTrack, SliderThumb, NumberInput, NumberInputField } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { newDaoVotingState } from "../../recoil";
import { useRecoilState } from "recoil";

function SliderControl({ name, title, tooltip }: { name: 'supportRequired' | 'minimumAcceptanceQuorum', title: string, tooltip: string }) {
    const [votingSettings, setVotingSettings] = useRecoilState(newDaoVotingState);
    const value = votingSettings[name];

    function onChange(value: string) {
        /^\d*\.?\d*$/.test(value) && Number(value) <= 100 && Number(value) >= 0 && setVotingSettings(settings => ({ ...settings, [name]: value }))
    }

    return (
        <FormControl pt="17px" pb="16px">
            <FormLabel>
                <HStack>
                    <Text fontSize="16px" color="brand.900">{title}</Text>
                    <Tooltip label={tooltip}>
                        <InfoOutlineIcon />
                    </Tooltip>
                </HStack>
            </FormLabel>
            <HStack justifyContent="space-between" width="100%">
                <Slider
                    aria-label='slider-ex-1'
                    value={Number(value)}
                    onChange={value => onChange(value.toString())}
                    flexGrow={1}
                    focusThumbOnChange={false}
                >
                    <SliderTrack><SliderFilledTrack /></SliderTrack>
                    <SliderThumb />
                </Slider>
                <InputGroup width="20%" ml="10px">
                    <NumberInput value={value}>
                        <NumberInputField onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} border="1px" _hover={{ border: "1px" }} _focusVisible={{boxShadow: 'none'}} />
                    </NumberInput>
                    <InputRightElement children="%" />
                </InputGroup>
            </HStack>
        </FormControl>
    )
}

function TimeInput ({ timeUnit }: {timeUnit: 'Days' | 'Hours' | 'Minutes'}) {
    const [votingSettings, setVotingSettings] = useRecoilState(newDaoVotingState);

    function handleTimeChange (time: string) {
        /^\d*\.?\d*$/.test(time) && setVotingSettings(settings => ({ ...settings, [`voteDuration${timeUnit}`]: time }))
    }

    return (
        <InputGroup variant="textRTL">
            <Input
                value={(votingSettings[`voteDuration${timeUnit}`])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTimeChange(e.target.value)}
            />
            <InputRightElement children={timeUnit} />
        </InputGroup>
    )
}

export default function ConfigureVoting() {
    return (
        <VStack spacing={4} mt="75" className="abcs-newdao-step-content">
            <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Voting</Text>
            <Text fontSize="24px" color="brand.900" mt="16px">Configure the DAO's voting parameters</Text>
            <Divider paddingTop="24px"
                borderColor="brand.900"
                borderBottomWidth="1px"
                width="100%"
                margin="0 auto"
            />
            <VStack width="90%">
                <SliderControl title="SUPPORT" name="supportRequired" tooltip="Support is the relative percentage of tokens that are required to vote “Yes” for a proposal to be approved. For example, if “Support” is set to 50%, then more than 50% of the tokens used to vote on a proposal must vote “Yes” for it to pass." />
                <SliderControl title="MINIMUM APPROVAL" name="minimumAcceptanceQuorum" tooltip="Minimum approval is the percentage of the total token supply that is required to vote “Yes” on a proposal before it can be approved. For example, if the “Minimum Approval” is set to 20%, then more than 20% of the outstanding token supply must vote “Yes” on a proposal for it to pass." />
                <HStack alignSelf="start" mt="16px">
                    <Text fontSize="16px" color="brand.900">VOTE DURATION</Text>
                    <Tooltip label="Vote duration is the length of time that the vote will be open for participation. For example, if the Vote Duration is set to 24 hours, then token holders have 24 hours to participate in the vote.">
                        <InfoOutlineIcon />
                    </Tooltip>
                </HStack>
                <HStack spacing={4}>
                    <TimeInput timeUnit="Days" />
                    <TimeInput timeUnit="Hours" />
                    <TimeInput timeUnit="Minutes" />
                </HStack>
            </VStack>
            <Divider paddingTop="12px"
                borderColor="brand.900"
                borderBottomWidth="1px"
                width="100%"
                margin="0 auto"
            />
            <VStack mt="16px" spacing={-1}>
                <Text fontSize="16px" color="black">These settings will determine required levels of support and approval for a proposal to pass in your DAO,</Text>
                <Text fontSize="16px" color="black">and the duration a proposal will be open for voting.</Text>
            </VStack>
        </VStack>
    );
}
