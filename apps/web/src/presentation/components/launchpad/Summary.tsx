import { Box, Button, Spinner, Text, HStack, Checkbox, VStack } from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useTransaction } from 'wagmi'

import { knownContracts } from '../../../../config.json';
import { Abi } from "viem";
import newDaoWithABCAbi from '../../../../utils/abi/augmented-bonding-curve.json'

type VotingSettings = {
    support: number,
    minApproval: number,
    days: number,
    hours: number,
    minutes: number
}

type TokenHolder = {
    address: string;
    balance: string;
}

type TokenSettings = {
    tokenName: string;
    tokenSymbol: string;
    tokenHolders: TokenHolder[];
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

export default function Summary() {

    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [txData, setTxData] = useState<any>(); // Type correctly

    // Initialize useRouter
    const navigate = useNavigate()

    // Handle user confirmation of summary
    const [validated, setValidated] = useState(false)

    // Retrieve settings from local storage
    const organizationName: string = localStorage.getItem('organizationName')!;
    const votingSettings: VotingSettings = JSON.parse(localStorage.getItem('votingSettings')!);
    const tokenSettings: TokenSettings = JSON.parse(localStorage.getItem('tokenSettings')!);
    const augmentedBondingCurveSettings: AugmentedBondingCurveSettings = JSON.parse(localStorage.getItem('augmentedBondingCurveSettings')!);

    // Process holder adresses and balances
    const addresses = tokenSettings.tokenHolders?.map((holder) => holder.address);
    const balances = tokenSettings.tokenHolders?.map((holder) => {
        if (holder.balance === null) {
            return null;
        }
        return (BigInt(holder.balance) * BigInt(1e18)).toString()
    });

    // Prepare contract

    /* ADD PROPER TRANSACTION HANDLING */
    // Execute contract function

    const handleLaunch = async () => {
        setIsLoading(true);
        setIsSending(true);
        const { config } = usePrepareContractWrite({
            address: knownContracts[100].NEW_DAO_WITH_ABC as `0x${string}`,
            abi: newDaoWithABCAbi as Abi,
            functionName: 'newTokenAndInstance',
            args: [
                tokenSettings.tokenName,
                tokenSettings.tokenSymbol,
                organizationName,
                addresses,
                balances,
                [(BigInt(1e16) * BigInt(votingSettings.support!)).toString(),
                (BigInt(1e16) * BigInt(votingSettings.minApproval!)).toString(),
                Number(votingSettings.days) * 24 * 60 * 60 + Number(votingSettings.hours) * 60 * 60 + Number(votingSettings.minutes) * 60],
                [(BigInt(1e16) * BigInt(augmentedBondingCurveSettings.entryTribute!)).toString(),
                (BigInt(1e16) * BigInt(augmentedBondingCurveSettings.exitTribute!)).toString()],
                augmentedBondingCurveSettings.collateralToken?.address,
                augmentedBondingCurveSettings.reserveRatio! * 10000,
                0
            ]
        })

        const tx = await useContractWrite(config);
        const data = await useWaitForTransaction({ hash: tx.data?.hash });
        setTxData(data);
        if (data.status === "success") {
            setIsLoading(false);
            setIsSending(false);
            const receipt = await useTransaction(txData) // Retrieve hash ? Verify docs
            console.log(receipt);
        } else if (data.status === "error") {
            console.log(data.error);
            // Handle error
        }

    }

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
                        <Button onClick={() => window.open("https://xdai.aragon.blossom.software/#/" + organizationName, "_blank", "noreferrer")}>See DAO</Button>
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
                                        <Text as="b">Organization domain: </Text>{organizationName + '.aragonid.eth'}
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
                                        Support: <Text as="b"> {votingSettings.support + '%'}</Text>
                                    </Text>
                                    <Text>
                                        Minimum approval: <Text as="b"> {votingSettings.minApproval + '%'}</Text>
                                    </Text>
                                    <Text>
                                        Vote duration: <Text as="b"> {votingSettings.days + ' days ' + votingSettings.hours + ' hours ' + votingSettings.minutes + ' minutes'}</Text>
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
                                        Token name: <Text as="b">{tokenSettings.tokenName}</Text>
                                    </Text>
                                    <Text>
                                        Token symbol: <Text as="b">{tokenSettings.tokenSymbol}</Text>
                                    </Text>
                                    <Table variant="simple" mt="20px" backgroundColor="brand.200" borderRadius="15px">
                                        <Thead>
                                            <Tr>
                                                <Th><Text color="brand.900" fontSize="12px" fontFamily="Roboto">HOLDER ACCOUNT</Text></Th>
                                                <Th><Text color="brand.900" fontSize="12px" fontFamily="Roboto">BALANCE</Text></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {tokenSettings.tokenHolders?.map((holder, index) => (
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
                                        Reserve ratio: <Text as="b">{augmentedBondingCurveSettings.reserveRatio + '%'}</Text>
                                    </Text>
                                    <Text>
                                        Colateral token: <Text as="b">{augmentedBondingCurveSettings.collateralToken?.symbol}</Text>
                                    </Text>
                                    <Text>
                                        Initial reserve token: <Text as="b">{augmentedBondingCurveSettings.initialReserve + ' ' + augmentedBondingCurveSettings.collateralToken?.symbol}</Text>
                                    </Text>
                                    <Text>
                                        Entry tribute: <Text as="b">{augmentedBondingCurveSettings.entryTribute + '%'}</Text>
                                    </Text>
                                    <Text>
                                        Exit tribute: <Text as="b">{augmentedBondingCurveSettings.entryTribute + '%'}</Text>
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                        <Checkbox onChange={(e) => setValidated(e.target.checked)}>Did you verify that all the information is correct?</Checkbox>
                        <HStack>
                            <Button alignSelf="flex-start" onClick={() => navigate('/augmented-bonding-curve')} colorScheme="blue">Back</Button>
                            <Button alignSelf="flex-end" isDisabled={!validated} onClick={handleLaunch} colorScheme="red">Launch</Button>
                        </HStack>
                    </VStack>
                </Box>
            )}
        </div>
    )
}