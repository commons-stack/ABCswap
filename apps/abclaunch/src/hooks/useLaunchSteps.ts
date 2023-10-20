import { useRecoilValue } from 'recoil';
import { parseAbi, parseUnits } from 'viem';
import { newDaoAbcState, newDaoNameState, newDaoTokenState, newDaoVotingDurationState, newDaoVotingState } from '../recoil';
import { getCollateralTokenInfo } from '../utils/token-info';
import { ABC_TEMPLATE } from '../constants';

export default function useLaunchSteps() {

    const daoName = useRecoilValue(newDaoNameState)
    const tokenSettings = useRecoilValue(newDaoTokenState)
    const votingSettings = useRecoilValue(newDaoVotingState)
    const votingDurationInSeconds = useRecoilValue(newDaoVotingDurationState)
    const abcSettings = useRecoilValue(newDaoAbcState)

    const decimals = getCollateralTokenInfo(abcSettings.collateralToken)?.decimals

    if (!decimals) {
        return []
    }

    return (
        [
            {
                title: 'Approve Spending',
                data: {
                    address: abcSettings.collateralToken as `0x${string}`,
                    abi: parseAbi(["function approve(address,uint256)"]),
                    functionName: 'approve',
                    args: [
                        ABC_TEMPLATE as `0x${string}`,
                        parseUnits(abcSettings.reserveInitialBalance, decimals)
                    ]
                }
            },
            {
                title: 'Launch ABC and DAO',
                data: {
                    address: ABC_TEMPLATE as `0x${string}`,
                    abi: parseAbi(["function newTokenAndInstance(string,string,string,address[],uint256[],uint64[3],uint256[5])"]),
                    functionName: 'newTokenAndInstance',
                    args: [
                        tokenSettings.tokenName,
                        tokenSettings.tokenSymbol,
                        daoName.name,
                        tokenSettings.tokenHolders.map((holder) => holder[0]),
                        tokenSettings.tokenHolders.map((holder) => parseUnits(holder[1], 18)),
                        [
                            parseUnits(votingSettings.supportRequired, 16),
                            parseUnits(votingSettings.minimumAcceptanceQuorum, 16),
                            votingDurationInSeconds
                        ],
                        [
                            parseUnits(abcSettings.entryTribute, 16),
                            parseUnits(abcSettings.exitTribute, 16),
                            abcSettings.collateralToken,
                            parseUnits(abcSettings.reserveRatio, 4),
                            parseUnits(abcSettings.reserveInitialBalance, decimals)
                        ]
                    ]
                }
            }
        ]
    )
}
