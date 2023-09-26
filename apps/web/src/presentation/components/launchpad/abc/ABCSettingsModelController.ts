import { useEffect, useState } from "react";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import { setABCConfig } from "../../../../domain/use-case/DAOCreationUseCases";
import { ABCConfig } from "../../../../domain/model/ABCConfig";
import { TokenInfo } from "../../../../domain/model/TokenInfo";

export function useABCSettingsModelController(daoCreationRepository: DAOCreationRepository) {
    const [augmentedBondingCurveSettings, setAugmentedBondingCurveSettings] = useState<ABCConfig>(new ABCConfig(
        daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio??0,
        daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance()??0,
        daoCreationRepository.getDAOInfo().getABCConfig().entryTribute??0,
        daoCreationRepository.getDAOInfo().getABCConfig().exitTribute??0,
        new TokenInfo(daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress??'', daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol??''),
    ));

    const collateralTokenList = [
        { address: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d", symbol: "WXDAI" },
        { address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83", symbol: "USDC" },
        { address: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb", symbol: "GNO" },
        { address: "0x4f4F9b8D5B4d0Dc10506e5551B0513B61fD59e75", symbol: "GIV" },
    ];

    useEffect(() => {
        async function init() {
          await daoCreationRepository.load();
          setAugmentedBondingCurveSettings(new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio??0,
            daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance()??0,
            daoCreationRepository.getDAOInfo().getABCConfig().entryTribute??0,
            daoCreationRepository.getDAOInfo().getABCConfig().exitTribute??0,
            new TokenInfo(daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress??'', daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol??''),
        ));
        }
        init();
      }, []);

    const handleReserveRatioChange = (value: string) => {
        const re = /[^0-9]+/g;
        const numericValue = Number(value.replaceAll(re, ''));
        const updatedSettings = new ABCConfig(
            numericValue,
            daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance()??0,
            daoCreationRepository.getDAOInfo().getABCConfig().entryTribute??0,
            daoCreationRepository.getDAOInfo().getABCConfig().exitTribute??0,
            new TokenInfo(daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress??'', daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol??''),
        );
        setAugmentedBondingCurveSettings(updatedSettings);
        setABCConfig(updatedSettings, daoCreationRepository);
    };

    const handleCollateralTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedToken = collateralTokenList.find(token => token.symbol === event.target.value);
        if (selectedToken) {
            const updatedSettings = new ABCConfig(
                daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio??0,
                daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance()??0,
                daoCreationRepository.getDAOInfo().getABCConfig().entryTribute??0,
                daoCreationRepository.getDAOInfo().getABCConfig().exitTribute??0,
                new TokenInfo(selectedToken.address, selectedToken.symbol),
            );
            
            setAugmentedBondingCurveSettings(updatedSettings);
            setABCConfig(updatedSettings, daoCreationRepository);
        }
    };

    const handleInitialReserveChange = (value: number) => {
        const updatedSettings = new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio??0,
            value,
            daoCreationRepository.getDAOInfo().getABCConfig().entryTribute??0,
            daoCreationRepository.getDAOInfo().getABCConfig().exitTribute??0,
            new TokenInfo(daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress??'', daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol??''),
        );
        setAugmentedBondingCurveSettings(updatedSettings);
        setABCConfig(updatedSettings, daoCreationRepository);
    };

    const handleEntryTributeChange = (value: number) => {
        const updatedSettings = new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio??0,
            daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance()??0,
            value,
            daoCreationRepository.getDAOInfo().getABCConfig().exitTribute??0,
            new TokenInfo(daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress??'', daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol??''),
        );
        setAugmentedBondingCurveSettings(updatedSettings);
        setABCConfig(updatedSettings, daoCreationRepository);
    };

    const handleExitTributeChange = (value: number) => {
        const updatedSettings = new ABCConfig(
            daoCreationRepository.getDAOInfo().getABCConfig().reserveRatio??0,
            daoCreationRepository.getDAOInfo().getABCConfig().getReserveInitialBalance()??0,
            daoCreationRepository.getDAOInfo().getABCConfig().entryTribute??0,
            value,
            new TokenInfo(daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenAddress??'', daoCreationRepository.getDAOInfo().getABCConfig().collateralToken?.tokenSymbol??''),
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