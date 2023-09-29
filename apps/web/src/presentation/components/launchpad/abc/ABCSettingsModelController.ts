import { useEffect, useState } from "react";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import { setABCConfig } from "../../../../domain/use-case/DAOCreationUseCases";
import { ABCConfig } from "../../../../domain/model/ABCConfig";
import { TokenInfo } from "../../../../domain/model/TokenInfo";

export function useABCSettingsModelController(daoCreationRepository: DAOCreationRepository) {
    const [augmentedBondingCurveSettings, setAugmentedBondingCurveSettings] = useState<ABCConfig>(new ABCConfig(
        daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio ?? 0,
        daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance() ?? 0,
        daoCreationRepository.getDAOInfo().getABCConfig().entryTribute ?? 0,
        daoCreationRepository.getDAOInfo().getABCConfig().exitTribute ?? 0,
        new TokenInfo(
            daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenName ?? '',
            daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol ?? '', 
            daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress ?? '',
            daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenLogo ?? '',
        ),    
    ));

    const [collateralTokenList, setCollateralTokenList] = useState<TokenInfo[]>([]);
    
    useEffect(() => {
        async function init() {
            await daoCreationRepository.loadDAOInfo();
            setAugmentedBondingCurveSettings(new ABCConfig(
                daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio ?? 0,
                daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance() ?? 0,
                daoCreationRepository.getDAOInfo().getABCConfig().entryTribute ?? 0,
                daoCreationRepository.getDAOInfo().getABCConfig().exitTribute ?? 0,
                new TokenInfo(
                    daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenName ?? '',
                    daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol ?? '', 
                    daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress ?? '',
                    daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenLogo ?? '',
                ),            
            ));
            await daoCreationRepository.getDAOCompatibleTokens().then((tokens) => {
                setCollateralTokenList(tokens);
            });
        }
        init();
    }, []);

    useEffect(() => {
        async function checkBalance() {
            console.log(daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance());
            console.log(augmentedBondingCurveSettings);

            console.log(daoCreationRepository.getDAOCompatibleTokens());
        }
        checkBalance();
    }, [
        daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance(), 
        daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol
    ])

    const handleReserveRatioChange = (value: string) => {
        const re = /[^0-9]+/g;
        const numericValue = Number(value.replaceAll(re, ''));
        const updatedSettings = new ABCConfig(
            numericValue,
            daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance() ?? 0,
            daoCreationRepository.getDAOInfo().getABCConfig().entryTribute ?? 0,
            daoCreationRepository.getDAOInfo().getABCConfig().exitTribute ?? 0,
            new TokenInfo(
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenName ?? '',
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol ?? '', 
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress ?? '',
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenLogo ?? '',
            ),
        );
        setAugmentedBondingCurveSettings(updatedSettings);
        setABCConfig(updatedSettings, daoCreationRepository);
    };

    const handleCollateralTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedToken = collateralTokenList.find(token => token.tokenSymbol === event.target.value);
        if (selectedToken) {
            const updatedSettings = new ABCConfig(
                daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio ?? 0,
                daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance() ?? 0,
                daoCreationRepository.getDAOInfo().getABCConfig().entryTribute ?? 0,
                daoCreationRepository.getDAOInfo().getABCConfig().exitTribute ?? 0,
                new TokenInfo(selectedToken.tokenName, selectedToken.tokenSymbol, selectedToken.tokenAddress, selectedToken.tokenLogo)
            );

            setAugmentedBondingCurveSettings(updatedSettings);
            setABCConfig(updatedSettings, daoCreationRepository);
        }
    };

    const handleInitialReserveChange = (value: number) => {
        const updatedSettings = new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio ?? 0,
            value,
            daoCreationRepository.getDAOInfo().getABCConfig().entryTribute ?? 0,
            daoCreationRepository.getDAOInfo().getABCConfig().exitTribute ?? 0,
            new TokenInfo(
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenName ?? '',
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol ?? '', 
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress ?? '',
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenLogo ?? '',
            ),
        );
        setAugmentedBondingCurveSettings(updatedSettings);
        setABCConfig(updatedSettings, daoCreationRepository);
    };

    const handleEntryTributeChange = (value: number) => {
        const updatedSettings = new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio ?? 0,
            daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance() ?? 0,
            value,
            daoCreationRepository.getDAOInfo().getABCConfig().exitTribute ?? 0,
            new TokenInfo(
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenName ?? '',
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol ?? '', 
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress ?? '',
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenLogo ?? '',
            ),
        );
        setAugmentedBondingCurveSettings(updatedSettings);
        setABCConfig(updatedSettings, daoCreationRepository);
    };

    const handleExitTributeChange = (value: number) => {
        const updatedSettings = new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio ?? 0,
            daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance() ?? 0,
            daoCreationRepository.getDAOInfo().getABCConfig().entryTribute ?? 0,
            value,
            new TokenInfo(
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenName ?? '',
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol ?? '', 
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress ?? '',
                daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenLogo ?? '',
            ),
        );
        setAugmentedBondingCurveSettings(updatedSettings);
        setABCConfig(updatedSettings, daoCreationRepository);
    };

    return {
        augmentedBondingCurveSettings,
        collateralTokenList,
        handleReserveRatioChange,
        handleCollateralTokenChange,
        handleInitialReserveChange,
        handleEntryTributeChange,
        handleExitTributeChange
    }
}