import { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite, useTransaction, useWaitForTransaction } from 'wagmi';
import { VotingConfig } from "../../../../domain/model/VotingConfig";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";

import { Abi } from "viem";
import { knownContracts } from '../../../../../config.json';
import newDaoWithABCAbi from '../../../../../utils/abi/augmented-bonding-curve.json';
import { ABCConfig } from "../../../../domain/model/ABCConfig";
import { TokenHolder } from "../../../../domain/model/TokenHolder";
import { TokenInfo } from "../../../../domain/model/TokenInfo";

export function useDAOCreationSummaryModelController(daoCreationRepository: DAOCreationRepository) {
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [txData, setTxData] = useState<any>(); // Type correctly

    // visual info
    const [daoName, setDAOName] = useState<string>(daoCreationRepository.getDAOInfo().name!);
    const [votingSettings, setVotingSettings] = useState<VotingConfig>(daoCreationRepository.getDAOInfo().votingConfig);
    const [tokenInfo, setTokenInfo] = useState<TokenInfo>(daoCreationRepository.getDAOInfo().tokenInfo);
    const [tokenHolders, setTokenHolders] = useState<TokenHolder[]>(daoCreationRepository.getDAOInfo().tokenHolders);
    const [abcConfig, setABCConfig] = useState<ABCConfig>(daoCreationRepository.getDAOInfo().abcConfig);


    useEffect(() => {
        async function init() {
          if(daoCreationRepository.isUsingDefaultData()){
            await daoCreationRepository.load();
          }
          setDAOName(daoCreationRepository.getDAOInfo().name ?? "");
          setVotingSettings(daoCreationRepository.getDAOInfo().getVotingConfig());
          setTokenInfo(daoCreationRepository.getDAOInfo().getTokenInfo());
          setTokenHolders(daoCreationRepository.getDAOInfo().getTokenHolders());
          setABCConfig(daoCreationRepository.getDAOInfo().getABCConfig());
        }
        init();
    }, []);

    // Prepare contract

    /* ADD PROPER TRANSACTION HANDLING */
    // Execute contract function

    const handleLaunch = async () => {
        if(daoCreationRepository.isUsingDefaultData()){
            await daoCreationRepository.load();
        }
        // Process holder adresses and balances
        const addresses = daoCreationRepository.getDAOInfo().tokenHolders?.map((holder) => holder.address);
        const balances = daoCreationRepository.getDAOInfo().tokenHolders?.map((holder) => {
            if (holder.balance === null) {
                return null;
            }
            return (BigInt(holder.balance) * BigInt(1e18)).toString()
        });

        setIsLoading(true);
        setIsSending(true);
        const { config } = usePrepareContractWrite({
            address: knownContracts[100].NEW_DAO_WITH_ABC as `0x${string}`,
            abi: newDaoWithABCAbi as Abi,
            functionName: 'newTokenAndInstance',
            args: [
                tokenInfo.tokenName,
                tokenInfo.tokenSymbol,
                daoName,
                addresses,
                balances,
                [(BigInt(1e16) * BigInt(votingSettings.getSupportRequiredValue())).toString(),
                (BigInt(1e16) * BigInt(votingSettings.getMinimumAcceptanceQuorumValue())).toString(),
                votingSettings.getVoteTotalDurationInSeconds()],
                [(BigInt(1e16) * BigInt(abcConfig.getEntryTribute()??0)).toString(),
                (BigInt(1e16) * BigInt(abcConfig.getExitTribute()??0)).toString()],
                abcConfig.getCollateralToken()?.getTokenAddress(),
                (abcConfig.getReserveRatio()??0) * 10000,
                0
            ]
        });

        const tx = await useContractWrite(config);
        const data = await useWaitForTransaction({ hash: tx.data?.hash });
        setTxData(data);
        if (data.status === "success") {
            setIsLoading(false);
            setIsSending(false);
            const receipt = await useTransaction(txData) // Retrieve hash ? Verify docs
            console.log(receipt);
        } else if (data.status === "error") {
            console.log(data.error);
            // Handle error
        }

    }


    return {
        isSending,
        setIsSending,
        isLoading,
        setIsLoading,
        txData,
        setTxData,
        daoName,
        votingSettings,
        tokenInfo,
        tokenHolders,
        abcConfig,
        handleLaunch,
    }
}