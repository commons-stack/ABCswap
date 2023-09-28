import { DAOCreationResult } from "../model/DAOCreationResult";
import { DAOInfoStatus } from "../enum/DAOInfoStatus";
import { DAOInfo } from "../model/DAOInfo";
import { TokenInfo } from "../model/TokenInfo";


export interface DAOCreationRepository {
    // ask for model data
    getDAOInfo(): DAOInfo;
    // set model data
    setDAOInfo(value: DAOInfo): void;

    // save data
    saveDAOInfo(): Promise<void>;
    // load data
    loadDAOInfo(): Promise<void>;

    isUsingDefaultData() : boolean;

    // create DAO
    isDAOInfoValid(daoInfo: DAOInfo) : DAOInfoStatus;
    createDAO() : Promise<DAOCreationResult>;

    // Obtain compatible reserve tokens
    getDAOCompatibleTokens(): Promise<TokenInfo[]>; // 
}