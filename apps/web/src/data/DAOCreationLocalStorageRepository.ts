import { ABCConfig } from "../domain/model/ABCConfig";
import { DAOInfo } from "../domain/model/DAOInfo";
import { TokenInfo } from "../domain/model/TokenInfo";
import { VotingConfig } from "../domain/model/VotingConfig";
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
            this._daoInfo = new DAOInfo(
                savedInfo.name, 
                VotingConfig.create(
                    savedInfo.votingConfig.supportRequired, 
                    savedInfo.votingConfig.minimumAcceptanceQuorum, 
                    savedInfo.votingConfig.voteDurationDays, 
                    savedInfo.votingConfig.voteDurationHours, 
                    savedInfo.votingConfig.voteDurationMinutes
                ),
                new TokenInfo(
                    savedInfo.tokenInfo.name,
                    savedInfo.tokenInfo.symbol,
                    savedInfo.tokenInfo.address
                ), 
                savedInfo.tokenHolders,
                new ABCConfig(
                    savedInfo.abcConfig.reserveRatio,
                    savedInfo.abcConfig.reserveInitialBalance,
                    savedInfo.abcConfig.entryTribute,
                    savedInfo.abcConfig.exitTribute,
                    savedInfo.abcConfig.collateralToken
                )
            );
        }
        this._isUsingDefaultData = false;
    }

    isUsingDefaultData(): boolean {
        return this._isUsingDefaultData;
    }
}

    