import { useEffect, useState } from "react";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import { setTokenHolders, setTokenInfo } from "../../../../domain/use-case/DAOCreationUseCases";
import { TokenHolder } from "../../../../domain/model/TokenHolder";
import { TokenInfo } from "../../../../domain/model/TokenInfo";
import { tokenHolderIsValid } from "./TokenSettingsValidators";

export interface TokenSettings {
    tokenName: string;
    tokenSymbol: string;
    tokenHolders: TokenHolder[];
}

export function useTokenSettingsModelController(daoCreationRepository: DAOCreationRepository, onStepCompletionChanged: (completed: boolean) => void) {
    
    const [tokenSettings, setTokenSettings] = useState<TokenSettings>({
        tokenName: '',
        tokenSymbol: '',
        tokenHolders: [{address: '', balance: ''}]
    });

    useEffect(() => {
        async function init() {
            if(daoCreationRepository.isUsingDefaultData()){
              await daoCreationRepository.loadDAOInfo();
            }
            if (daoCreationRepository.getDAOInfo().getName()) {
                setTokenSettings({
                    tokenName: daoCreationRepository.getDAOInfo().getTokenInfo().tokenName ?? "",
                    tokenSymbol: daoCreationRepository.getDAOInfo().getTokenInfo().tokenSymbol ?? "",
                    tokenHolders: daoCreationRepository.getDAOInfo().getTokenHolders() ?? [{address: '', balance: ''}]
                });
            }
        }
        init();
    }, []);

    useEffect(() => {
        const isCompleted = !!(tokenSettings.tokenName && tokenSettings.tokenSymbol && tokenSettings.tokenHolders.length > 0);
        if (onStepCompletionChanged) {
            onStepCompletionChanged(isCompleted);
        }
    }, [tokenSettings]);

    function updateTokenHoldersInRepository(newTokenHolders : TokenHolder[]) {
        const validNewTokenHolders = newTokenHolders.filter((holder) => tokenHolderIsValid(holder));
        setTokenHolders(validNewTokenHolders, daoCreationRepository);
    }

    function handleHolderChange(i: number, event: React.ChangeEvent<HTMLInputElement>, field: boolean) {
        const values = [...tokenSettings.tokenHolders];
        values[i] = { ...values[i], [field ? 'address' : 'balance']: event.target.value };
        setTokenSettings({ ...tokenSettings, tokenHolders: values });
        updateTokenHoldersInRepository(values);
    }

    function handleRemoveHolder(i: number) {
        const values = [...tokenSettings.tokenHolders];
        if (values.length === 1) {
            values[i] = { address: '', balance: '' };
        } else {
            values.splice(i, 1);
        }
        setTokenSettings({ ...tokenSettings, tokenHolders: values });
        updateTokenHoldersInRepository(values);
    }

    function handleAddEmptyHolder() {
        const newHolders = [
            ...tokenSettings.tokenHolders,
            { address: '', balance: '' },
        ];
        const newTokenSettings = {
            ...tokenSettings,
            tokenHolders: newHolders,
        };
        setTokenSettings(newTokenSettings);
    }

    function handleChangeTokenName(tokenName: string) {
        const newTokenSettings = {
            ...tokenSettings,
            tokenName: tokenName,
        };
        setTokenSettings(newTokenSettings);
        setTokenInfo(new TokenInfo(newTokenSettings.tokenName, newTokenSettings.tokenSymbol), daoCreationRepository);
    }

    function handleChangeTokenSymbol(tokenSymbol: string) {
        const newTokenSettings = {
            ...tokenSettings,
            tokenSymbol: tokenSymbol,
        };
        setTokenSettings(newTokenSettings);
        setTokenInfo(new TokenInfo(newTokenSettings.tokenName, newTokenSettings.tokenSymbol), daoCreationRepository);
    }

    return {
        tokenSettings,
        handleHolderChange,
        handleRemoveHolder,
        handleAddEmptyHolder,
        handleChangeTokenName,
        handleChangeTokenSymbol
    };
}