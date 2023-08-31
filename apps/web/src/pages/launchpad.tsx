import OrganizationName from '../components/launchpad/OrganizationName'
import VotingSettings from '../components/launchpad/VotingSettings'
import TokenSettings from '../components/launchpad/TokenSettings'
import Header from '../components/shared/Header'
import { useState } from 'react'
import AugmentedBondingCurveSettings from '../components/launchpad/AugmentedBondingCurveSettings'

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
    colateralToken: CollateralToken;
    initialReserve: number;
    entryTribute: number;
    exitTribute: number;
}

type CollateralToken = {
    address: string;
    symbol: string;
}

export default function Launchpad() {
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
        colateralToken: { address: '', symbol: '' },
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
            <OrganizationName onOrganizationNameChanged={organizationNameChanged} />
            <VotingSettings onVotingSettingsChanged={votingSettingsChanged} />
            <TokenSettings onTokenSettingsChanged={tokenSettingsChanged} />
            <AugmentedBondingCurveSettings onAugmentedBondingCurveSettingsChanged={augmentedBondingCurveSettingsChanged} />
        </>
    )
}
