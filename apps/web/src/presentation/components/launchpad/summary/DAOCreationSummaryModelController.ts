import { useEffect, useState } from "react";
import { useTransaction } from 'wagmi';
import { VotingConfig } from "../../../../domain/model/VotingConfig";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";

import { ABCConfig } from "../../../../domain/model/ABCConfig";
import { DAOCreationResult, DAOCreationResultStatus } from "../../../../domain/model/DAOCreationResult";
import { TokenHolder } from "../../../../domain/model/TokenHolder";
import { TokenInfo } from "../../../../domain/model/TokenInfo";
import { launchDAO } from "../../../../domain/use-case/DAOCreationUseCases";

export function useDAOCreationSummaryModelController(daoCreationRepository: DAOCreationRepository) {
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [txData, setTxData] = useState<any>(); // Type correctly

    // visual info
    const [daoName, setDAOName] = useState<string>(daoCreationRepository.getDAOInfo().getName()!);
    const [votingSettings, setVotingSettings] = useState<VotingConfig>(daoCreationRepository.getDAOInfo().getVotingConfig());
    const [tokenInfo, setTokenInfo] = useState<TokenInfo>(daoCreationRepository.getDAOInfo().getTokenInfo());
    const [tokenHolders, setTokenHolders] = useState<TokenHolder[]>(daoCreationRepository.getDAOInfo().getTokenHolders());
    const [abcConfig, setABCConfig] = useState<ABCConfig>(daoCreationRepository.getDAOInfo().getABCConfig());


    useEffect(() => {
        async function init() {
          if(daoCreationRepository.isUsingDefaultData()){
            await daoCreationRepository.loadDAOInfo();
          }
          setDAOName(daoCreationRepository.getDAOInfo().getName() ?? "");
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
        setIsLoading(true);
        setIsSending(true);
        const result : DAOCreationResult = await launchDAO(daoCreationRepository);
        // Process holder adresses and balances
        
        if(result.status == DAOCreationResultStatus.SUCCESS){
            const data = result.data;
            setTxData(data);
            if (data.status === "success") {
                // should always fall here if result.status is success
                setIsLoading(false);
                setIsSending(false);
                const receipt = await useTransaction(txData) // Retrieve hash ? Verify docs
                console.log(receipt);
            } else if (data.status === "error") {
                // should never get here
                console.log(data.error);
            }
        } else {
            // TODO: Handle error
        }
    }


    return {
        isSending,
        isLoading,
        txData,
        daoName,
        votingSettings,
        tokenInfo,
        tokenHolders,
        abcConfig,
        handleLaunch,
    }
}