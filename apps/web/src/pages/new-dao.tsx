import { Box, HStack, Text, VStack, Image, Button } from '@chakra-ui/react'
import OrganizationName from '../components/launchpad/OrganizationName'
import VotingSettings from '../components/launchpad/VotingSettings'
import TokenSettings from '../components/launchpad/TokenSettings'
import { useEffect, useState } from 'react'
import AugmentedBondingCurveSettings from '../components/launchpad/AugmentedBondingCurveSettings'
import Summary from '../components/launchpad/Summary'
import { CustomConnectButtonLong } from '../components/shared/ConnectButtonLong'
import { useAccount } from 'wagmi'
import DAOLayout from '../components/launchpad/DAOLayout'

type VotingSettings = {
    support: number,
    minApproval: number,
    days: number,
    hours: number,
    minutes: number,
    completed: boolean;
}

type TokenHolder = {
    address: string;
    balance: string;
}

type TokenSettings = {
    tokenName: string;
    tokenSymbol: string;
    tokenHolders: TokenHolder[];
    completed: boolean;
}

type AugmentedBondingCurveSettings = {
    reserveRatio: number;
    collateralToken: CollateralToken;
    initialReserve: number;
    entryTribute: number;
    exitTribute: number;
    completed: boolean;
}

type CollateralToken = {
    address: string;
    symbol: string;
}

export default function NewDao() {
    const { address } = useAccount();
    const [step, setStep] = useState(0);

    const handleStart = () => {
        setStep(1);
    }

    // Organization name 
    const [organizationNameStatus, setOrganizationNameStatus] = useState<boolean>(false);
    
    // Voting settings
    const [votingSettingsStatus, setVotingSettingsStatus] = useState<boolean>(true);

    // Token settings
    const [tokenSettingsStatus, setTokenSettingsStatus] = useState<boolean>(false);

    // Augmented bonding curve settings
    const [augmentedBondingCurveSettingsStatus, setAugmentedBondingCurveSettingsStatus] = useState<boolean>(false);

    // Handle childrent components events
    const organizationNameChanged = (data: boolean) => {
        setOrganizationNameStatus(data);
    }

    const votingSettingsChanged = (data: boolean) => {
        setVotingSettingsStatus(data);    
    }

    const tokenSettingsChanged = (data: boolean) => {
        setTokenSettingsStatus(data);
    }

    const augmentedBondingCurveSettingsChanged = (data: boolean) => {
        setAugmentedBondingCurveSettingsStatus(data);
    }

    const stepChanged = (data: number) => {
        setStep(data);
    }

    const steps = [
        {
            title: 'Start',
            content: <></>,
            index: 0,
            completed: true
        },
        {
            title: 'Choose DAO name',
            content: <OrganizationName onStepCompletionChanged={organizationNameChanged} />,
            index: 1,
            completed: organizationNameStatus
        }, 
        {
            title: 'Configure voting',
            content: <VotingSettings onStepCompletionChanged={votingSettingsChanged} />,
            index: 2,
            completed: votingSettingsStatus
        },
        {
            title: 'Configure token',
            content: <TokenSettings onStepCompletionChanged={tokenSettingsChanged} />,
            index: 3,
            completed: tokenSettingsStatus
        },
        {
            title: 'Configure ABC',
            content: <AugmentedBondingCurveSettings onStepCompletionChanged={augmentedBondingCurveSettingsChanged} />,
            index: 4,
            completed: augmentedBondingCurveSettingsStatus
        },
    ]

    if (step !== 0) {
        return (
            <>
            <DAOLayout steps={steps} currentStep={step} onStepChanged={stepChanged} />
            </>
        )
    } else {
        return (
            <>
                <Box bg="brand.100">
                    <VStack spacing={0} pb="244px">
                        <Text fontSize="72px" color="brand.900" fontFamily="VictorSerifTrial">Create your DAO</Text>
                        <Text fontSize="24px" color="brand.900">Connect your wallet to start creating your DAO</Text>
                        <Text fontSize="24px" color="brand.900">with Augmented Bonding Curve</Text>
                        <Text fontSize="24px" color="brand.900" pt="64px" as="b">It is simple, you just have to follow the following steps</Text>
                        <HStack pb="32px" pt="56px" spacing={24}>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/DAOName.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Choose</Text>
                                <Text fontSize="24px" color="brand.900">DAO name</Text>
                            </VStack>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/ConfigureVoting.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Configure</Text>
                                <Text fontSize="24px" color="brand.900">voting</Text>
                            </VStack>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/ConfigureToken.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Configure</Text>
                                <Text fontSize="24px" color="brand.900">token</Text>
                            </VStack>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/ConfigureABC.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Configure</Text>
                                <Text fontSize="24px" color="brand.900">ABC</Text>
                            </VStack>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/LaunchDAO.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Launch</Text>
                                <Text fontSize="24px" color="brand.900">your DAO</Text>
                            </VStack>
                        </HStack>
                        {address ? <Button onClick={handleStart}>Let's start</Button> : <CustomConnectButtonLong />}
                    </VStack>
                </Box>
            </>
        );
    }
}

{/* <Summary tokenSettings={tokenSettings} votingSettings={votingSettings} augmentedBondingCurveSettings={augmentedBondingCurveSettings} organizationName={organizationName} /> */ }