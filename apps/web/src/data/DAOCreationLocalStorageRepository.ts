import { DAOInfo } from "../domain/model/DAOInfo";
import { DAOCreationRepository } from "../domain/repository/DAOCreationRepository";


export class DAOCreationLocalStorageRepository implements DAOCreationRepository {
    private _daoInfo: DAOInfo;
    private _isUsingDefaultData : boolean;

    constructor() {
        this._daoInfo = new DAOInfo();
        this._isUsingDefaultData = true;
    }

    getDAOInfo(): DAOInfo {
        return this._daoInfo;
    }

    setDAOInfo(value: DAOInfo): void {
        this._daoInfo = value;
    }

    async save(): Promise<void> {
        localStorage.setItem("daoInfo", JSON.stringify(this._daoInfo));
        this._isUsingDefaultData = false;
    }

    async load(): Promise<void> {
        let daoInfo = localStorage.getItem("daoInfo");
        if (daoInfo) {
            const savedInfo = JSON.parse(daoInfo);
            this._daoInfo = new DAOInfo(savedInfo.name, savedInfo.votingConfig, savedInfo.tokenInfo, savedInfo.tokenHolders, savedInfo.abcConfig);
        }
        this._isUsingDefaultData = false;
    }

    isUsingDefaultData(): boolean {
        return this._isUsingDefaultData;
    }
}

    