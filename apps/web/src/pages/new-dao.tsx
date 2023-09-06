import { Box, HStack, Text, VStack, Image } from '@chakra-ui/react'
import OrganizationName from '../components/launchpad/OrganizationName'
import VotingSettings from '../components/launchpad/VotingSettings'
import TokenSettings from '../components/launchpad/TokenSettings'
import Header from '../components/shared/Header'
import { useState } from 'react'
import AugmentedBondingCurveSettings from '../components/launchpad/AugmentedBondingCurveSettings'
import Summary from '../components/launchpad/Summary'
import { CustomConnectButtonLong } from '../components/shared/ConnectButtonLong'

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

    return (
        <>
            <Box>
                <VStack spacing={0} pb="244px">
                    <Text fontSize="72px" color="brand.900">Create your DAO</Text>
                    <Text fontSize="24px" color="brand.900">Connect your wallet to start creating your DAO</Text>
                    <Text fontSize="24px" color="brand.900">with Augmented Bonding Curve</Text>
                    <Text fontSize="24px" color="brand.900" pt="64px" as="b"> It is simple, you just have to follow the following steps</Text>
                    <HStack pb="32px" pt="56px" spacing={24}> 
                        <VStack spacing={0}>
                            <Image src="../../..//public/launchpad/DAOName.svg" pb="16px"/>
                            <Text fontSize="24px" color="brand.900">Choose</Text>
                            <Text fontSize="24px" color="brand.900">DAO name</Text>
                        </VStack>
                        <VStack spacing={0}>
                            <Image src="../../..//public/launchpad/ConfigureVoting.svg" pb="16px"/>
                            <Text fontSize="24px" color="brand.900">Configure</Text>
                            <Text fontSize="24px" color="brand.900">voting</Text>
                        </VStack>
                        <VStack spacing={0}>
                            <Image src="../../..//public/launchpad/ConfigureToken.svg" pb="16px"/>
                            <Text fontSize="24px" color="brand.900">Configure</Text>
                            <Text fontSize="24px" color="brand.900">token</Text>
                        </VStack>
                        <VStack spacing={0}>
                            <Image src="../../..//public/launchpad/ConfigureABC.svg" pb="16px"/>
                            <Text fontSize="24px" color="brand.900">Configure</Text>
                            <Text fontSize="24px" color="brand.900">ABC</Text>
                        </VStack>
                        <VStack spacing={0}>
                            <Image src="../../..//public/launchpad/LaunchDAO.svg" pb="16px"/>
                            <Text fontSize="24px" color="brand.900">Launch</Text>
                            <Text fontSize="24px" color="brand.900">your DAO</Text>
                        </VStack>
                    </HStack>
                    <CustomConnectButtonLong />
                </VStack>
            </Box>
        </>
    )
{/*

<OrganizationName onOrganizationNameChanged={organizationNameChanged} />
            <VotingSettings onVotingSettingsChanged={votingSettingsChanged} />
            <TokenSettings onTokenSettingsChanged={tokenSettingsChanged} />
            <AugmentedBondingCurveSettings onAugmentedBondingCurveSettingsChanged={augmentedBondingCurveSettingsChanged} />
            <Summary tokenSettings={tokenSettings} votingSettings={votingSettings} augmentedBondingCurveSettings={augmentedBondingCurveSettings} organizationName={organizationName}/>

*/}

}