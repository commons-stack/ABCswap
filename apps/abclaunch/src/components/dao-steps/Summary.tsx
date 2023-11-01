import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Checkbox, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import MarkdownModal from "commons-ui/src/components/MarkdownModal";
import { getCollateralTokenInfo } from "../../utils/token-info";
import { useNameAtom, useTokenSettingsValue, useInitialTotalSupplyValue, useVotingSettingsValue, useAbcSettingsValue, useDaoInfoCheckedAtom, useLegalsCheckedAtom} from "../../store";

import { TERMS_OF_SERVICE, PRIVACY_POLICY } from "../../constants";

export enum StepType {
    ORGANIZATION_SETTINGS,
    VOTING_SETTINGS,
    TOKEN_SETTINGS,
    ABC_SETTINGS
}

interface SummaryProps {
    steps: StepType[];
}

export default function Summary({ steps }: SummaryProps) {
    const [daoName] = useNameAtom();
    const tokenSettings = useTokenSettingsValue();
    const initialTotalSupply = useInitialTotalSupplyValue();
    const votingSettings = useVotingSettingsValue();
    const abcSettings = useAbcSettingsValue();
    const [daoInfoChecked, setDaoInfoChecked] = useDaoInfoCheckedAtom();
    const [legalsChecked, setLegalsChecked] = useLegalsCheckedAtom();


    function getAccordionPanel(stepType: StepType): JSX.Element | undefined {
        var panelContent = undefined

        if (stepType === StepType.ORGANIZATION_SETTINGS) {
            panelContent = (
                <Text>
                    Organization name: <Text as="b">{daoName}</Text>
                </Text>
            )

        } else if (stepType === StepType.VOTING_SETTINGS) {
            panelContent = (
                <>
                    <Text>
                        Support: <Text as="b"> {votingSettings.supportRequired}%</Text>
                    </Text>
                    <Text>
                        Minimum approval: <Text as="b"> {votingSettings.minimumAcceptanceQuorum}%</Text>
                    </Text>
                    <Text>
                        Vote duration: <Text as="b"> {votingSettings.voteDurationDays} days {votingSettings.voteDurationHours} hours {votingSettings.voteDurationMinutes} minutes</Text>
                    </Text>
                </>
            )
        } else if (stepType === StepType.TOKEN_SETTINGS) {
            panelContent = (
                <>
                    <Text>
                        Token name: <Text as="b">{tokenSettings.name}</Text>
                    </Text>
                    <Text>
                        Token symbol: <Text as="b">{tokenSettings.symbol}</Text>
                    </Text>
                    <Text>
                        Initial token supply: <Text as="b">{initialTotalSupply} {tokenSettings.symbol}</Text>
                    </Text>
                    <Table variant="simple" mt="20px" backgroundColor="brand.200" borderRadius="15px">
                        <Thead>
                            <Tr>
                                <Th><Text color="brand.900" fontSize="12px" fontFamily="Roboto">HOLDER ACCOUNT</Text></Th>
                                <Th><Text color="brand.900" fontSize="12px" fontFamily="Roboto">BALANCE</Text></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tokenSettings.holders?.map((holder, index) => (
                                <Tr key={index}>
                                    <Td>{holder[0] || "-"}</Td>
                                    <Td>{holder[1] !== null ? holder[1] : "-"}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </>
            )
        } else if (stepType === StepType.ABC_SETTINGS) {
            panelContent = (
                <>
                    <Text>
                        Reserve ratio: <Text as="b">{abcSettings.reserveRatio}%</Text>
                    </Text>
                    <Text>
                        Colateral token: <Text as="b">{getCollateralTokenInfo(abcSettings.collateralToken)?.tokenSymbol}</Text>
                    </Text>
                    <Text>
                        Initial reserve token: <Text as="b">{abcSettings.reserveInitialBalance} {getCollateralTokenInfo(abcSettings.collateralToken)?.tokenSymbol}</Text>
                    </Text>
                    <Text>
                        Entry tribute: <Text as="b">{abcSettings.entryTribute}%</Text>
                    </Text>
                    <Text>
                        Exit tribute: <Text as="b">{abcSettings.exitTribute}%</Text>
                    </Text>
                </>
            )
        } else {
            return undefined
        } 

        return (
            <AccordionPanel pb={4}>
                {panelContent}
            </AccordionPanel>
        )
    }

    function getAccordionButton(stepType: StepType): JSX.Element | undefined {
        var buttonName = "";

        if (stepType === StepType.ORGANIZATION_SETTINGS) {
            buttonName = "DAO name";
        } else if (stepType === StepType.VOTING_SETTINGS) {
            buttonName = "Voting settings";
        } else if (stepType === StepType.TOKEN_SETTINGS) {
            buttonName = "Token settings";
        } else if (stepType === StepType.ABC_SETTINGS) {
            buttonName = "ABC settings";
        } else {
            return undefined;
        }

        return (
            <AccordionButton borderBottom="1px solid" borderBottomColor="brand.900">
                <Box flex='1' textAlign='left'>
                    <Text color="brand.900">{buttonName}</Text>
                </Box>
                <AccordionIcon />
            </AccordionButton>
        )
    }

    function getAccordionItem(stepType: StepType): JSX.Element | undefined {
        return (
            <AccordionItem>
                {getAccordionButton(stepType)}
                {getAccordionPanel(stepType)}
            </AccordionItem>
        )
    }

    return (
        <Box pt="75px">
            <VStack spacing={4}>
                <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Launch your DAO</Text>
                <Text fontSize="24px" color="brand.900" >Make sure your settings are correct</Text>
                <Accordion width="80%" allowToggle allowMultiple>
                    {steps.map((stepType) => {
                        return getAccordionItem(stepType)
                    })}
                </Accordion>
                <VStack spacing={-1}>
                    <Text fontSize="16px">Review all the settings.</Text>
                    <Text fontSize="16px">If there are any mistakes, fix them before proceeding.</Text>
                </VStack>
                <Checkbox colorScheme="brand" isChecked={daoInfoChecked} onChange={(e) => setDaoInfoChecked(e.target.checked)}>I confirm that the above information is correct</Checkbox>
                <Checkbox colorScheme="brand" isChecked={legalsChecked} onChange={(e) => setLegalsChecked(e.target.checked)}>
                    <HStack spacing={1}>
                        <Text>I agree to the</Text>
                        <MarkdownModal src={TERMS_OF_SERVICE} linkText='Terms of Service' />
                        <Text>and</Text>
                        <MarkdownModal src={PRIVACY_POLICY} linkText='Privacy Policy' />
                    </HStack>
                </Checkbox>
            </VStack>
        </Box>
    )
}
