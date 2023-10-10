import { Abi } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { knownContracts } from '../../../shared/config.json';
import newDaoWithABCAbi from '../../../shared/src/utils/abi/augmented-bonding-curve.json';
import { DAOInfoStatus } from "../domain/enum/DAOInfoStatus";
import { ABCConfig } from "../domain/model/ABCConfig";
import { DAOCreationResult, DAOCreationResultStatus } from "../domain/model/DAOCreationResult";
import { DAOInfo } from "../domain/model/DAOInfo";
import { TokenInfo } from "../domain/model/TokenInfo";
import { VotingConfig } from "../domain/model/VotingConfig";
import { DAOCreationRepository } from "../domain/repository/DAOCreationRepository";


export class DAOCreationWagmiLSRepository implements DAOCreationRepository {
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

    async saveDAOInfo(): Promise<void> {
        localStorage.setItem("daoInfo", JSON.stringify(this._daoInfo));
        this._isUsingDefaultData = false;
    }

    async loadDAOInfo(): Promise<void> {
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
                    savedInfo.tokenInfo.tokenName,
                    savedInfo.tokenInfo.tokenSymbol,
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

    isDAOInfoValid(daoInfo: DAOInfo): DAOInfoStatus {
        if(daoInfo.getName() == ""){
            return DAOInfoStatus.ERROR_INVALID_NAME;
        }
        if(
            daoInfo.getVotingConfig().getSupportRequiredValue() == 0 ||
            daoInfo.getVotingConfig().getMinimumAcceptanceQuorumValue() == 0 ||
            daoInfo.getVotingConfig().getVoteTotalDurationInSeconds() < 24*60*60
        ){
            return DAOInfoStatus.ERROR_INVALID_VOTING_CONFIG;
        }
        if(
            daoInfo.getTokenInfo().getTokenName() == "" ||
            daoInfo.getTokenInfo().getTokenSymbol() == ""
        ){
            return DAOInfoStatus.ERROR_INVALID_TOKEN_INFO;
        }
        if(daoInfo.getTokenHolders().length == 0){
            return DAOInfoStatus.ERROR_INVALID_TOKEN_HOLDERS;
        }
        if(
            (daoInfo.getABCConfig().getReserveRatio() ?? 0) < 0 ||
            (daoInfo.getABCConfig().getReserveRatio() ?? 0) > 100 ||
            (daoInfo.getABCConfig().getReserveInitialBalance() ?? 0) < 0 ||
            (daoInfo.getABCConfig().getEntryTribute() ?? 0) < 0 ||
            (daoInfo.getABCConfig().getEntryTribute() ?? 0) > 1000 ||
            (daoInfo.getABCConfig().getExitTribute() ?? 0) < 0 ||
            (daoInfo.getABCConfig().getExitTribute() ?? 0) > 100 ||
            daoInfo.getABCConfig().getCollateralToken() == undefined
        ){
            return DAOInfoStatus.ERROR_INVALID_ABC_CONFIG;
        }

        return DAOInfoStatus.VALID
    }

    async createDAO(): Promise<DAOCreationResult> {
        try {
            const addresses = this._daoInfo.getTokenHolders()?.map((holder) => holder.address);
            const balances = this._daoInfo.getTokenHolders()?.map((holder) => {
                if (holder.balance === null) {
                    return null;
                }
                return (BigInt(holder.balance) * BigInt(1e18)).toString()
            });
        
            const tokenInfo = this._daoInfo.getTokenInfo();
            const daoName = this._daoInfo.getName();
            const votingSettings = this._daoInfo.getVotingConfig();
            const abcConfig = this._daoInfo.getABCConfig();
        
            const { config } = usePrepareContractWrite({
                address: knownContracts[100].NEW_DAO_WITH_ABC as `0x${string}`,
                abi: newDaoWithABCAbi as Abi,
                functionName: 'newTokenAndInstance',
                args: [
                    tokenInfo.tokenName,
                    tokenInfo.tokenSymbol,
                    daoName,
                    addresses,
                    balances,
                    [(BigInt(1e16) * BigInt(votingSettings.getSupportRequiredValue())).toString(),
                    (BigInt(1e16) * BigInt(votingSettings.getMinimumAcceptanceQuorumValue())).toString(),
                    votingSettings.getVoteTotalDurationInSeconds()],
                    [(BigInt(1e16) * BigInt(abcConfig.getEntryTribute()??0)).toString(),
                    (BigInt(1e16) * BigInt(abcConfig.getExitTribute()??0)).toString()],
                    abcConfig.getCollateralToken()?.getTokenAddress(),
                    (abcConfig.getReserveRatio()??0) * 10000,
                    0
                ]
            });

            const tx = await useContractWrite(config);
            const data = await useWaitForTransaction({ hash: tx.data?.hash });
            return {
                status: (data.status !== "success") ? DAOCreationResultStatus.ERROR : DAOCreationResultStatus.SUCCESS,
                data: data,
                error: data.error
            }
        } catch(error){
            return {
                status: DAOCreationResultStatus.ERROR,
                error: error
            }
        }
    }

    async getDAOCompatibleTokens(): Promise<TokenInfo[]> {
        return [
            new TokenInfo("Optimism", "OP", "0x4200000000000000000000000000000000000042", "/token-logos/optimism-ethereum-op-logo.svg"),
            new TokenInfo("USDT", "USDT", "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58", "/token-logos/tether-usdt-logo.svg"),
            new TokenInfo("DAI", "DAI", "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1", "/token-logos/multi-collateral-dai-dai-logo.svg"),
            new TokenInfo("USDC", "USDC", "0x7f5c764cbc14f9669b88837ca1490cca17c31607", "/token-logos/usd-coin-usdc-logo.svg"),
            new TokenInfo("GIV", "GIV", "0x528cdc92eab044e1e39fe43b9514bfdab4412b98", "/token-logos/giveth-giv-logo.png"),
        ];
    }
    
}

    