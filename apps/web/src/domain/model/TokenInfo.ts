export class TokenInfo {
    tokenName: string|undefined;
    tokenSymbol: string|undefined;
    tokenAddress: string|undefined;

    constructor(tokenName?: string, tokenSymbol?: string, tokenAddress?: string) {
        this.tokenName = tokenName;
        this.tokenSymbol = tokenSymbol;
        this.tokenAddress = tokenAddress;
    }

    // setting values
    setTokenName(value: string): void {
        this.tokenName = value;
    }

    setTokenSymbol(value: string): void {
        this.tokenSymbol = value;
    }

    setTokenAddress(value: string): void {
        this.tokenAddress = value;
    }


    // getting values

    getTokenName(): string|undefined {
        return this.tokenName;
    }

    getTokenSymbol(): string|undefined {
        return this.tokenSymbol;
    }

    getTokenAddress(): string|undefined {
        return this.tokenAddress;
    }

}