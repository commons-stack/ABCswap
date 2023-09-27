import { useEffect, useState } from "react";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import { VotingConfig } from "../../../../domain/model/VotingConfig";
import { setVotingConfig } from "../../../../domain/use-case/DAOCreationUseCases";

export type VotingSettings = {
    support: number,
    minApproval: number,
    days: number,
    hours: number,
    minutes: number
}

export function useVotingSettingsModelController(onStepCompletionChanged: (completed: boolean) => void, daoCreationRepository: DAOCreationRepository) {

    const [votingSettings, setVotingSettings] = useState<VotingSettings>({
        support: 50,
        minApproval: 15,
        days: 7,
        hours: 0,
        minutes: 0,
    });

    useEffect(() => {
        async function init() {
            await daoCreationRepository.load();
            const votingSettigs : VotingConfig = daoCreationRepository.getDAOInfo().getVotingConfig();//localStorage.getItem('votingSettings');
            if(votingSettigs) {
                setVotingSettings({
                    support: votingSettigs.getSupportRequiredValue(),
                    minApproval: votingSettigs.getMinimumAcceptanceQuorumValue(),
                    days: votingSettigs.getVoteDurationDays(),
                    hours: votingSettigs.getVoteDurationHours(),
                    minutes: votingSettigs.getVoteDurationMinutes()
                });
            }
        }
        init();
    }, []);

    useEffect(() => {
        const isCompleted = votingSettings.support > 0 && (votingSettings.days > 0 || votingSettings.hours > 0 || votingSettings.minutes > 0)
        if (onStepCompletionChanged) {
            onStepCompletionChanged(isCompleted);
        }
    }, [votingSettings]);

    const updateVotingConfigInRepository = async () => {
        const votingConfig = VotingConfig.create(
            votingSettings.support,
            votingSettings.minApproval,
            votingSettings.days,
            votingSettings.hours,
            votingSettings.minutes
        );
        await setVotingConfig(votingConfig, daoCreationRepository);
    }

    const handleSupportChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            support: value
        };
        setVotingSettings(updatedSettings);
        updateVotingConfigInRepository();
    };

    const handleMinApprovalChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            minApproval: value
        };
        setVotingSettings(updatedSettings);
        updateVotingConfigInRepository();
    };

    const handleDaysChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            days: value
        };
        setVotingSettings(updatedSettings);
        updateVotingConfigInRepository();
    };

    const handleHoursChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            hours: value
        };
        setVotingSettings(updatedSettings);
        updateVotingConfigInRepository();
    };

    const handleMinutesChange = (value: number) => {
        const updatedSettings = {
            ...votingSettings,
            minutes: value
        };
        setVotingSettings(updatedSettings);
        updateVotingConfigInRepository();
    };

    return {
        handleSupportChange,
        handleMinApprovalChange,
        handleDaysChange,
        handleHoursChange,
        handleMinutesChange,
        votingSettings
    }
}