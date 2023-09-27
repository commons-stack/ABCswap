import { DAOInfo } from "../model/DAOInfo";

export interface DAOCreationRepository {
    // ask for model data
    getDAOInfo(): DAOInfo;

    // set model data
    setDAOInfo(value: DAOInfo): void;

    // save data
    save(): Promise<void>;

    // load data
    load(): Promise<void>;

    isUsingDefaultData() : boolean;
}