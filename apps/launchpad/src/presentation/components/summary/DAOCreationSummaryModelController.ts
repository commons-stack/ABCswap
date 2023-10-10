import { useEffect, useState } from "react";
import { VotingConfig } from "../../../domain/model/VotingConfig";
import { DAOCreationRepository } from "../../../domain/repository/DAOCreationRepository";

import { ABCConfig } from "../../../domain/model/ABCConfig";
import { TokenHolder } from "../../../domain/model/TokenHolder";
import { TokenInfo } from "../../../domain/model/TokenInfo";

export function useDAOCreationSummaryModelController(daoCreationRepository: DAOCreationRepository) {

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

    return {
        daoName,
        votingSettings,
        tokenInfo,
        tokenHolders,
        abcConfig,
    }
}