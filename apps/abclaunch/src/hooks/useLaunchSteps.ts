import { parseAbi, parseUnits } from 'viem';
import { getCollateralTokenInfo } from '../utils/token-info';
import { ABC_TEMPLATE } from '../constants';
import { useAbcSettingsValue, useVotingDurationValue, useNameAtom, useTokenSettingsValue, useVotingSettingsValue } from '../store';

export default function useLaunchSteps() {

    const [daoName] = useNameAtom();
    const tokenSettings = useTokenSettingsValue();
    const votingSettings = useVotingSettingsValue();
    const votingDurationInSeconds = useVotingDurationValue()
    const abcSettings = useAbcSettingsValue();

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
                        parseUnits(abcSettings.reserveInitialBalance[0], decimals)
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
                        tokenSettings.name,
                        tokenSettings.symbol,
                        daoName,
                        tokenSettings.holders.map((holder) => holder[0]),
                        tokenSettings.holders.map((holder) => parseUnits(holder[1], 18)),
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
                            parseUnits(abcSettings.reserveInitialBalance[0], decimals)
                        ]
                    ]
                }
            }
        ]
    )
}
