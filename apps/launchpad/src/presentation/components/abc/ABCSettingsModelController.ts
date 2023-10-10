import { useEffect, useState } from "react";
import { DAOCreationRepository } from "../../../domain/repository/DAOCreationRepository";
import { setABCConfig } from "../../../domain/use-case/DAOCreationUseCases";
import { ABCConfig } from "../../../domain/model/ABCConfig";
import { TokenInfo } from "../../../domain/model/TokenInfo";
import { fetchBalance, getAccount } from "@wagmi/core";
import { parseEther } from "viem";

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
    const [enoughBalance, setEnoughBalance] = useState<boolean>(true);

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
            const account = await getAccount();
            const balance = await fetchBalance({
                address: account.address as `0x${string}`,
                token: daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress as `0x${string}`
            });
            const initialBalance = daoCreationRepository?.getDAOInfo()?.getABCConfig()?.getReserveInitialBalance() ?? 0
            const parsedInitialBalance = parseEther(String(initialBalance));
            if (initialBalance && balance.value >= parsedInitialBalance || initialBalance == 0) {
                setEnoughBalance(true);
            } else {
                setEnoughBalance(false);
            }
        }
        checkBalance();
    }, [
        augmentedBondingCurveSettings.reserveInitialBalance,
        augmentedBondingCurveSettings.collateralToken?.tokenSymbol
    ])

    const handleReserveRatioChange = (value: string) => {
        const re = /[^0-9]+/g;
        let numericValue = Number(value.replaceAll(re, ''));

        numericValue = numericValue > 100 ? 100 : (numericValue < 0 ? 0 : numericValue);

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

    const handleInitialReserveChange = (value: string) => {
        const re = /[^0-9]+/g;
        const numericValue = Number(value.replaceAll(re, ''));
        const updatedSettings = new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio ?? 0,
            numericValue,
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

    const handleEntryTributeChange = (value: string) => {
        const re = /[^0-9]+/g;
        let numericValue = Number(value.replaceAll(re, ''));

        numericValue = numericValue > 100 ? 100 : (numericValue < 0 ? 0 : numericValue);

        const updatedSettings = new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio ?? 0,
            daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance() ?? 0,
            numericValue,
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

    const handleExitTributeChange = (value: string) => {
        const re = /[^0-9]+/g;
        let numericValue = Number(value.replaceAll(re, ''));

        numericValue = numericValue > 100 ? 100 : (numericValue < 0 ? 0 : numericValue);

        const updatedSettings = new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio ?? 0,
            daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance() ?? 0,
            daoCreationRepository.getDAOInfo().getABCConfig().entryTribute ?? 0,
            numericValue,
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
        enoughBalance,
        handleReserveRatioChange,
        handleCollateralTokenChange,
        handleInitialReserveChange,
        handleEntryTributeChange,
        handleExitTributeChange
    }
}