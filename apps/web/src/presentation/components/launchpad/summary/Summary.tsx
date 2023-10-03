import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, HStack, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import { useDAOCreationSummaryModelController } from "./DAOCreationSummaryModelController";

interface SummaryViewProps {
    daoCreationRepository : DAOCreationRepository;
};

export default function Summary({daoCreationRepository} : SummaryViewProps) {
    // use cases
    const {
        isSending,
        isLoading,
        txData,
        daoName,
        votingSettings,
        tokenInfo,
        tokenHolders,
        abcConfig,
        handleLaunch,
    } = useDAOCreationSummaryModelController(daoCreationRepository);


    

    // Initialize useRouter
    const navigate = useNavigate()

    // Handle user confirmation of summary
    const [validated, setValidated] = useState(false)


    return (
        <div>
            {isSending || isLoading ? (
                <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg" width="50vw">
                    <VStack spacing={4}>
                        <Text fontSize="2xl" as="b" p="1rem" textAlign="center">Creating your DAO...</Text>
                        <Spinner size="xl" />
                    </VStack>
                </Box>
            ) : txData && !!txData.hash ? (
                <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg" width="50vw">
                    <VStack spacing={4}>
                        <Text fontSize="2xl" as="b" p="1rem" textAlign="center">Your DAO has been successfully created!</Text>
                        <Button onClick={() => window.open("https://xdai.aragon.blossom.software/#/" + daoName, "_blank", "noreferrer")}>See DAO</Button>
                    </VStack>
                </Box>
            ) : (
                <Box pt="100px">
                    <VStack spacing={4}>
                        <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Launch your DAO</Text>
                        <Text fontSize="24px" color="brand.900" >Make sure your settings are correct</Text>
                        <Accordion width="80%">
                            <AccordionItem>
                                <AccordionButton borderBottom="1px solid" borderBottomColor="brand.900">
                                    <Box flex='1' textAlign='left'>
                                        <Text color="brand.900">Organization settings</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Text>
                                        <Text as="b">Organization domain: </Text>{daoName + '.aragonid.eth'}
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionButton borderBottom="1px solid" borderBottomColor="brand.900">
                                    <Box flex='1' textAlign='left'>
                                        <Text color="brand.900">Governance settings</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Text>
                                        Support: <Text as="b"> {votingSettings.getSupportRequiredValue() + '%'}</Text>
                                    </Text>
                                    <Text>
                                        Minimum approval: <Text as="b"> {votingSettings.getMinimumAcceptanceQuorumValue() + '%'}</Text>
                                    </Text>
                                    <Text>
                                        Vote duration: <Text as="b"> {votingSettings.getVoteDurationDays() + ' days ' + votingSettings.getVoteDurationHours() + ' hours ' + votingSettings.getVoteDurationMinutes() + ' minutes'}</Text>
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionButton borderBottom="1px solid" borderBottomColor="brand.900">
                                    <Box flex='1' textAlign='left'>
                                        <Text color="brand.900">Token settings</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Text>
                                        Token name: <Text as="b">{tokenInfo.tokenName}</Text>
                                    </Text>
                                    <Text>
                                        Token symbol: <Text as="b">{tokenInfo.tokenSymbol}</Text>
                                    </Text>
                                    <Table variant="simple" mt="20px" backgroundColor="brand.200" borderRadius="15px">
                                        <Thead>
                                            <Tr>
                                                <Th><Text color="brand.900" fontSize="12px" fontFamily="Roboto">HOLDER ACCOUNT</Text></Th>
                                                <Th><Text color="brand.900" fontSize="12px" fontFamily="Roboto">BALANCE</Text></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {tokenHolders?.map((holder, index) => (
                                                <Tr key={index}>
                                                    <Td>{holder.address || "-"}</Td>
                                                    <Td>{holder.balance !== null ? holder.balance : "-"}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionButton borderBottom="1px solid" borderBottomColor="brand.900">
                                    <Box flex='1' textAlign='left'>
                                        <Text color="brand.900">Augmented bonding curve settings</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Text>
                                        Reserve ratio: <Text as="b">{abcConfig.getReserveRatio() + '%'}</Text>
                                    </Text>
                                    <Text>
                                        Colateral token: <Text as="b">{abcConfig.collateralToken?.tokenSymbol}</Text>
                                    </Text>
                                    <Text>
                                        Initial reserve token: <Text as="b">{abcConfig.getReserveInitialBalance() + ' ' + abcConfig.collateralToken?.tokenSymbol}</Text>
                                    </Text>
                                    <Text>
                                        Entry tribute: <Text as="b">{abcConfig.entryTribute + '%'}</Text>
                                    </Text>
                                    <Text>
                                        Exit tribute: <Text as="b">{abcConfig.entryTribute + '%'}</Text>
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                        <Checkbox onChange={(e) => setValidated(e.target.checked)}>Did you verify that all the information is correct?</Checkbox>
                    </VStack>
                </Box>
            )}
        </div>
    )
}