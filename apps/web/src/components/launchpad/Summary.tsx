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
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { ethers } from "ethers";

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

interface SummaryProps {
    votingSettings: VotingSettings,
    tokenSettings: TokenSettings,
    augmentedBondingCurveSettings: AugmentedBondingCurveSettings,
    organizationName: string
}

import { usePrepareContractWrite, useContractWrite } from 'wagmi'

export default function Summary({ tokenSettings, votingSettings, augmentedBondingCurveSettings, organizationName }: SummaryProps) {
    // Initialize useRouter
    const router = useRouter()

    // Handle user confirmation of summary
    const [validated, setValidated] = useState(false)

    // Process holder adresses and balances
    const addresses = tokenSettings.tokenHolders?.map((holder) => holder.address);
    const balances = tokenSettings.tokenHolders?.map((holder) => {
        if (holder.balance === null) {
            return null;
        }
        return (BigInt(holder.balance) * BigInt(1e18)).toString()
    });

    // ABI
    const abi = [
        {
            "inputs": [
                {
                    "name": "_tokenName",
                    "type": "string"
                },
                {
                    "name": "_tokenSymbol",
                    "type": "string"
                },
                {
                    "name": "_id",
                    "type": "string"
                },
                {
                    "name": "_holders",
                    "type": "address[]"
                },
                {
                    "name": "_stakes",
                    "type": "uint256[]"
                },
                {
                    "name": "_votingSettings",
                    "type": "uint64[3]"
                },
                {
                    "name": "_fees",
                    "type": "uint256[2]"
                },
                {
                    "name": "_collateralToken",
                    "type": "address"
                },
                {
                    "name": "_reserveRatio",
                    "type": "uint32"
                },
                {
                    "name": "_initialBalance",
                    "type": "uint256"
                }
            ],
            "name": "newTokenAndInstance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]

    // Prepare contract
    const { config, error } = usePrepareContractWrite({
        address: '0xafbb787a94c9bf664294b9d6c7148db538f82f0f',
        abi: abi,
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

    /* ADD PROPER TRANSACTION HANDLING */
    // Execute contract function
    const { data, isLoading, write } = useContractWrite(config)

    // State to store the transaction status
    const [isMined, setIsMined] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const handleLaunch = () => {
        setIsSending(true);
        write?.();
    }

    // Effect to check the transaction status
    useEffect(() => {
        if (data?.hash) {
            setIsSending(false);
            const provider = new ethers.providers.JsonRpcProvider("https://rpc.gnosischain.com/");
            const interval = setInterval(async () => {
                const receipt = await provider.getTransactionReceipt(data.hash);
                if (receipt && receipt.blockNumber) {
                    setIsMined(true);
                    clearInterval(interval);
                }
            }, 15000); // Check every 5 seconds


            return () => clearInterval(interval); // Clean up on unmount
        }
    }, [data]);

    /* TILL HERE ADD PROPER TRANSACTION HANDLING */

    return (
        <div>
            {isSending || isLoading ? (
                <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg" width="50vw">
                    <VStack spacing={4}>
                        <Text fontSize="2xl" as="b" p="1rem" textAlign="center">Creating your DAO...</Text>
                        <Spinner size="xl" />
                    </VStack>
                </Box>
            ) : data && !!data.hash ? (
                <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg" width="50vw">
                    <VStack spacing={4}>
                        <Text fontSize="2xl" as="b" p="1rem" textAlign="center">Your DAO has been successfully created!</Text>
                        <Button onClick={() => window.open("https://xdai.aragon.blossom.software/#/" + organizationName, "_blank", "noreferrer")}>See DAO</Button>
                    </VStack>
                </Box>
            ) : (
                <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg" width="50vw">
                    <VStack spacing={4}>
                        <Text fontSize="2xl" as="b" p="1rem" textAlign="center">Summary</Text>
                        <Text fontSize="xl" as="b" p="1rem" textAlign="center">Make sure your settings are correct</Text>
                        <Accordion width="80%">
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Organization settings
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text>
                                        Organization domain: <Text as="b">{organizationName + '.aragonid.eth'}</Text>
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Governance settings
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
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
                                    <Text>
                                        Token name: <Text as="b">{tokenSettings.tokenName}</Text>
                                    </Text>
                                    <Text>
                                        Token symbol: <Text as="b">{tokenSettings.tokenSymbol}</Text>
                                    </Text>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Holder account</Th>
                                                <Th>Balance</Th>
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
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Augmented bonding curve settings
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
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
                            <Button alignSelf="flex-start" onClick={() => router.push('/augmented-bonding-curve')} colorScheme="blue">Back</Button>
                            <Button alignSelf="flex-end" isDisabled={!validated} onClick={handleLaunch} colorScheme="red">Launch</Button>
                        </HStack>
                    </VStack>
                </Box>
            )}
        </div>
    )
}