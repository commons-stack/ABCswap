import { Box, HStack, Text, VStack, Image, Button } from '@chakra-ui/react'
import OrganizationName from '../components/launchpad/OrganizationName'
import VotingSettings from '../components/launchpad/VotingSettings'
import TokenSettings from '../components/launchpad/TokenSettings'
import { useState } from 'react'
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

export default function NewDao() {
    const { address } = useAccount();
    const [step, setStep] = useState(0);

    const handleStart = () => {
        setStep(1);
    }

    // Organization name 
    const [organizationName, setOrganizationName] = useState('')

    // Voting settings
    const [votingSettings, setVotingSettings] = useState<VotingSettings>({
        support: 50,
        minApproval: 15,
        days: 7,
        hours: 0,
        minutes: 0,
    });

    // Token settings
    const [tokenSettings, setTokenSettings] = useState<TokenSettings>({
        tokenName: '',
        tokenSymbol: '',
        tokenHolders: []
    });

    // Augmented bonding curve settings
    const [augmentedBondingCurveSettings, setAugmentedBondingCurveSettings] = useState({
        reserveRatio: 0,
        collateralToken: { address: '', symbol: '' },
        initialReserve: 0,
        entryTribute: 0,
        exitTribute: 0,
    });

    // Handle childrent components events
    const organizationNameChanged = (data: string) => {
        setOrganizationName(data);
        console.log(data);
    }

    const votingSettingsChanged = (data: VotingSettings) => {
        setVotingSettings(data);
    }

    const tokenSettingsChanged = (data: TokenSettings) => {
        setTokenSettings(data);
    }

    const augmentedBondingCurveSettingsChanged = (data: AugmentedBondingCurveSettings) => {
        setAugmentedBondingCurveSettings(data);
        console.log(data);
    }

    const stepChanged = (data: number) => {
        setStep(data);
    }

    const steps = [
        {
            title: 'Start',
            content: <></>,
            index: 0
        },
        {
            title: 'Organization name',
            content: <OrganizationName onOrganizationNameChanged={organizationNameChanged} />,
            index: 1
        }, 
        {
            title: 'Voting settings',
            content: <VotingSettings onVotingSettingsChanged={votingSettingsChanged} />,
            index: 2
        },
        {
            title: 'Token settings',
            content: <TokenSettings onTokenSettingsChanged={tokenSettingsChanged} />,
            index: 3
        },
        {
            title: 'Augmented Bonding Curve settings',
            content: <AugmentedBondingCurveSettings onAugmentedBondingCurveSettingsChanged={augmentedBondingCurveSettingsChanged} />,
            index: 4
        },
    ]

    if (step !== 0) {
        return (
            <>
            <DAOLayout steps={steps} currentStep={step} onStepChanged={stepChanged}/>
            </>
        )
    } else {
        return (
            <>
                <Box bg="brand.100">
                    <VStack spacing={0} pb="244px">
                        <Text fontSize="72px" color="brand.900">Create your DAO</Text>
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