import OrganizationName from '../../components/name/OrganizationName'
import VotingSettings from '../../components/voting/VotingSettings'
import TokenSettings from '../../components/token/TokenSettings'
import AugmentedBondingCurveSettings from '../../components/abc/AugmentedBondingCurveSettings'
import Summary from '../../components/summary/Summary'
import { useEffect, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { parseEther } from 'viem'
import { DAOCreationRepository } from '../../../domain/repository/DAOCreationRepository'
import { launchDAO } from '../../../domain/use-case/DAOCreationUseCases'

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

interface NewDaoProps {
    daoCreationRepository : DAOCreationRepository;
}

export function useNewDaoModelController({daoCreationRepository} : NewDaoProps) {
    const { address } = useAccount();
    const [enoughBalance, setEnoughBalance] = useState<boolean>(false);
    const { data: balance } = useBalance({ address });

    const [step, setStep] = useState(0);

    const handleStart = () => {
        setStep(1);
    }

    useEffect(() => {
        if (!balance?.value || balance?.value > (parseEther('0.0005'))) {
            setEnoughBalance(true);
        } else {
            setEnoughBalance(false);
        }
    }, [address, balance]);

    // Organization name 
    const [organizationNameStatus, setOrganizationNameStatus] = useState<boolean>(false);

    // Voting settings
    const [votingSettingsStatus, setVotingSettingsStatus] = useState<boolean>(true);

    // Token settings
    const [tokenSettingsStatus, setTokenSettingsStatus] = useState<boolean>(false);

    // Augmented bonding curve settings
    const [augmentedBondingCurveSettingsStatus, setAugmentedBondingCurveSettingsStatus] = useState<boolean>(false);

    // Summary status
    const [summaryStatus, setSummaryStatus] = useState<boolean>(false);

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

    const summaryChanged = (data: boolean) => {
        setSummaryStatus(data);
    }

    const nextStep = () => {
        setStep(step + 1);
    }

    const previousStep = () => {
        setStep(step - 1);
    }

    // Steps
    const steps = [
        {
            title: 'Start',
            content: <></>,
            index: 0,
            completed: true
        },
        {
            title: 'Choose DAO name',
            content: <OrganizationName onStepCompletionChanged={organizationNameChanged} daoCreationRepository={daoCreationRepository}/>,
            index: 1,
            completed: organizationNameStatus,
        },
        {
            title: 'Configure voting',
            content: <VotingSettings onStepCompletionChanged={votingSettingsChanged} daoCreationRepository={daoCreationRepository} />,
            index: 2,
            completed: votingSettingsStatus
        },
        {
            title: 'Configure token',
            content: <TokenSettings onStepCompletionChanged={tokenSettingsChanged} daoCreationRepository={daoCreationRepository}/>,
            index: 3,
            completed: tokenSettingsStatus
        },
        {
            title: 'Configure ABC',
            content: <AugmentedBondingCurveSettings onStepCompletionChanged={augmentedBondingCurveSettingsChanged} daoCreationRepository={daoCreationRepository} />,
            index: 4,
            completed: augmentedBondingCurveSettingsStatus
        },
        {
            title: 'Launch your DAO',
            content: <Summary onStepCompletionChanged={summaryChanged} daoCreationRepository={daoCreationRepository}/>,
            index: 5,
            completed: summaryStatus,
            nextStepText: 'Launch',
            nextStepAction: () => launchDAO(daoCreationRepository)
        }
    ]

    return {
        address,
        enoughBalance,
        step,
        steps,
        handleStart,
        nextStep,
        previousStep
    }
}