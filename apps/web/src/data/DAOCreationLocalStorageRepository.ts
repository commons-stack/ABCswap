import { DAOInfo } from "../domain/model/DAOInfo";
import { DAOCreationRepository } from "../domain/repository/DAOCreationRepository";


export class DAOCreationLocalStorageRepository implements DAOCreationRepository {
    // TODO: This should be a DAOInfo object
    private _daoInfo: DAOInfo;

    constructor() {
        this._daoInfo = new DAOInfo();
    }

    getDAOInfo(): DAOInfo {
        return this._daoInfo;
    }

    setDAOInfo(value: DAOInfo): void {
        this._daoInfo = value;
    }

    async save(): Promise<void> {
        localStorage.setItem("daoInfo", JSON.stringify(this._daoInfo));

        // localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
        // localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
        // localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
        // localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
        // localStorage.setItem('augmentedBondingCurveSettings', JSON.stringify(updatedSettings));
        //localStorage.getItem('augmentedBondingCurveSettings') && setAugmentedBondingCurveSettings(JSON.parse(localStorage.getItem('augmentedBondingCurveSettings') ?? ''));

        // localStorage.setItem('organizationName', organizationName); 
    }

    async load(): Promise<void> {
        let daoInfo = localStorage.getItem("daoInfo");
        if (daoInfo) {
            this._daoInfo = JSON.parse(daoInfo);
        }

        // Retrieve settings from local storage
        // const organizationName: string = localStorage.getItem('organizationName')!;
        // const votingSettings: VotingSettings = JSON.parse(localStorage.getItem('votingSettings')!);
        // const tokenSettings: TokenSettings = JSON.parse(localStorage.getItem('tokenSettings')!);
        // const augmentedBondingCurveSettings: AugmentedBondingCurveSettings = JSON.parse(localStorage.getItem('augmentedBondingCurveSettings')!);

        // const storedOrganizationName = localStorage.getItem('organizationName');
    }
}

    