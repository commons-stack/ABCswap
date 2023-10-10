import { knownContracts } from '../../../shared/config.json';
import { parseAbi, parseUnits } from 'viem';
import { DAOInfo } from '../domain/model/DAOInfo';

interface DaoLaunchStepsProps {
    launcherAddress: string;
    DAOInfo: DAOInfo;
}

export default function useLaunchSteps({
    launcherAddress,
    DAOInfo,
}: DaoLaunchStepsProps) {

    const daoAbi = parseAbi(["function newTokenAndInstsance(string,string,string,address[],uint256[],uint64[3],uint256[5])"])
    const approveAbi = parseAbi(["function approve(address,uint256)"]);

    return (
        [
            {
                title: 'Raise approval',
                data: {
                    address: DAOInfo.getABCConfig().collateralToken?.tokenAddress as `0x${string}`,
                    abi: approveAbi,
                    functionName: 'approve',
                    args: [
                        launcherAddress as `0x${string}`,
                        parseUnits(DAOInfo.getABCConfig().reserveInitialBalance?.toString()?? "", 16)
                    ]
                }
            },
            {
                title: 'Launch DAO',
                data: {
                    address: knownContracts[10].NEW_DAO_WITH_ABC as `0x${string}`,
                    abi: daoAbi,
                    functionName: 'newTokenAndInstance',
                    args: [
                        DAOInfo.getTokenInfo().getTokenName(),
                        DAOInfo.getTokenInfo().getTokenSymbol(),
                        DAOInfo.getName(),
                        DAOInfo.getTokenHolders().map((holder) => holder.address),
                        DAOInfo.getTokenHolders().map((holder) => holder.balance),
                        [
                            parseUnits(DAOInfo.getVotingConfig().setSupportRequiredValue.toString(), 4),
                            parseUnits(DAOInfo.getVotingConfig().getMinimumAcceptanceQuorumValue.toString(), 4),
                            DAOInfo.getVotingConfig().getVoteTotalDurationInSeconds()
                        ],
                        [
                            parseUnits(DAOInfo.getABCConfig().getEntryTribute()?.toString()?? "", 16),
                            parseUnits(DAOInfo.getABCConfig().getExitTribute()?.toString()?? "".toString(), 16),
                            DAOInfo.getABCConfig().collateralToken?.tokenAddress,
                            parseUnits(DAOInfo.getABCConfig().getReserveRatio()?.toString() ?? "", 4),
                            parseUnits(DAOInfo.getABCConfig().getReserveInitialBalance()?.toString() ?? "", 16)
                        ]
                    ]
                }
            }
        ]
    )
}