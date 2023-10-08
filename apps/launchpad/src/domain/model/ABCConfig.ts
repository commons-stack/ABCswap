import { TokenInfo } from "./TokenInfo";

export class ABCConfig {
    reserveRatio: number|undefined;
    reserveInitialBalance: number|undefined;
    entryTribute: number|undefined;
    exitTribute: number|undefined;
    collateralToken: TokenInfo|undefined;

    constructor(reserveRatio?: number, reserveInitialBalance?: number, entryTribute?: number, exitTribute?: number, collateralToken?: TokenInfo) {
        this.reserveRatio = reserveRatio;
        this.reserveInitialBalance = reserveInitialBalance;
        this.entryTribute = entryTribute;
        this.exitTribute = exitTribute;
        this.collateralToken = collateralToken;
    }

    // setting values
    public setReserveRatio(value: number): void {
        this.reserveRatio = value;
    }

    public setReserveInitialBalance(value: number): void {
        this.reserveInitialBalance = value;
    }

    public setEntryTribute(value: number): void {
        this.entryTribute = value;
    }

    public setExitTribute(value: number): void {
        this.exitTribute = value;
    }

    public setCollateralToken(value: TokenInfo): void {
        this.collateralToken = value;
    }
    
    // getting values
    public getReserveRatio(): number|undefined {
        return this.reserveRatio;
    }

    public getReserveInitialBalance(): number|undefined {
        return this.reserveInitialBalance;
    }

    public getEntryTribute(): number|undefined {
        return this.entryTribute;
    }

    public getExitTribute(): number|undefined {
        return this.exitTribute;
    }

    public getCollateralToken(): TokenInfo|undefined {
        return this.collateralToken;
    }

}