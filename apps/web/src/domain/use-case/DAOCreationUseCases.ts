import { ABCConfig } from "../model/ABCConfig";
import { DAOInfo } from "../model/DAOInfo";
import { TokenHolder } from "../model/TokenHolder";
import { TokenInfo } from "../model/TokenInfo";
import { VotingConfig } from "../model/VotingConfig";
import { DAOCreationRepository } from "../repository/DAOCreationRepository";

// This is the use case that will be used by the UI to set the DAO name.
export async function setDAOName(
    value: string,
    repository: DAOCreationRepository
): Promise<void> {
    var daoInfo : DAOInfo = repository.getDAOInfo();
    daoInfo.setName(value);
    repository.setDAOInfo(daoInfo);
    repository.save();
}

// This is the use case that will be used by the UI to set the voting config.
export async function setVotingConfig(
    value: VotingConfig,
    repository: DAOCreationRepository
): Promise<void> {
    var daoInfo = repository.getDAOInfo();
    daoInfo.setVotingConfig(value);
    repository.setDAOInfo(daoInfo);
    repository.save();
}

// This is the use case that will be used by the UI to set the token config.
export async function setTokenInfo(
    value: TokenInfo,
    repository: DAOCreationRepository
): Promise<void> {
    var daoInfo = repository.getDAOInfo();
    daoInfo.setTokenInfo(value);
    repository.setDAOInfo(daoInfo);
    repository.save();
}

// This is the use case that will be used by the UI to set the token holders.
export async function setTokenHolders(
    value: TokenHolder[],
    repository: DAOCreationRepository
): Promise<void> {
    var daoInfo = repository.getDAOInfo();
    daoInfo.setTokenHolders(value);
    repository.setDAOInfo(daoInfo);
    repository.save();
}

// This is the use case that will be used by the UI to set the ABC config.
export async function setABCConfig(
    value: ABCConfig,
    repository: DAOCreationRepository
): Promise<void> {
    var daoInfo = repository.getDAOInfo();
    daoInfo.setABCConfig(value);
    repository.setDAOInfo(daoInfo);
    repository.save();
}