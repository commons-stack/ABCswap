import { ABCConfig } from "./ABCConfig";
import { TokenHolder } from "./TokenHolder";
import { TokenInfo } from "./TokenInfo";
import { VotingConfig } from "./VotingConfig";

export class DAOInfo {
    private name: string|undefined;
    private votingConfig: VotingConfig;
    private tokenInfo: TokenInfo;
    private tokenHolders: TokenHolder[];
    private abcConfig: ABCConfig;

    constructor(name?: string, votingConfig?: VotingConfig, tokenInfo?: TokenInfo, tokenHolders?: TokenHolder[], abcConfig?: ABCConfig) {
        this.name = name;
        this.votingConfig = votingConfig ?? new VotingConfig();
        this.tokenInfo = tokenInfo ?? new TokenInfo();
        this.tokenHolders = tokenHolders ?? [];
        this.abcConfig = abcConfig ?? new ABCConfig();
    }

    // setting values
    public setName(value: string): void {
        this.name = value;
    }

    public setVotingConfig(value: VotingConfig): void {
        this.votingConfig = value;
    }

    public setTokenInfo(value: TokenInfo): void {
        this.tokenInfo = value;
    }

    public setTokenHolders(value: TokenHolder[]): void {
        this.tokenHolders = value;
    }

    public setABCConfig(value: ABCConfig): void {
        this.abcConfig = value;
    }

    // getting values
    public getName(): string|undefined {
        return this.name;
    }

    public getVotingConfig(): VotingConfig {
        return this.votingConfig;
    }

    public getTokenInfo(): TokenInfo {
        return this.tokenInfo;
    }

    public getTokenHolders(): TokenHolder[] {
        return this.tokenHolders;
    }

    public getABCConfig(): ABCConfig {
        return this.abcConfig;
    }
}