import { knownContracts } from '../../../shared/config.json';
import { parseAbi, parseUnits } from 'viem';
import { DAOInfo } from '../domain/model/DAOInfo';

interface DaoLaunchStepsProps {
    address: string | undefined;
    DAOInfo: DAOInfo;
}

export default function useLaunchSteps({
    address,
    DAOInfo,
}: DaoLaunchStepsProps) {

    const daoAbi = parseAbi(["function newTokenAndInstsance(string,string,string,address[],uint256[],uint64[3],uint256[5])"])
    const approveAbi = parseAbi(["function approve(address,uint256)"]);

    console.log(DAOInfo.getVotingConfig().getSupportRequiredValue().toString())
    console.log(DAOInfo.getVotingConfig().getMinimumAcceptanceQuorumValue.toString())

    return (
        [
            {
                title: 'Raise approval',
                data: {
                    address: DAOInfo.getABCConfig().collateralToken?.tokenAddress as `0x${string}`,
                    abi: approveAbi,
                    functionName: 'approve',
                    args: [
                        address as `0x${string}`,
                        parseUnits(DAOInfo.getABCConfig().reserveInitialBalance?.toString() ?? "", 16)
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
                            parseUnits(DAOInfo.getVotingConfig().getSupportRequiredValue().toString(), 4),
                            parseUnits("15", 4),
                            DAOInfo.getVotingConfig().getVoteTotalDurationInSeconds()
                        ],
                        [
                            parseUnits(DAOInfo.getABCConfig().getEntryTribute()?.toString() ?? "", 16),
                            parseUnits(DAOInfo.getABCConfig().getExitTribute()?.toString() ?? "".toString(), 16),
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