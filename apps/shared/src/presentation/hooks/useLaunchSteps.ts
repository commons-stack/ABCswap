import { knownContracts } from '../../../config.json';
import { Abi, parseAbi, parseUnits } from 'viem';
import calculateTimeInSeconds from '../../utils/calculateTimeInSeconds';

interface DaoLaunchStepsProps {
    tokenName: string;
    tokenSymbol: string;
    daoName: string;
    holderAddresses: string[];
    holderAmounts: number[];
    supportRequiredPct: number;
    minAcceptQuorumPct: number;
    voteDurationDays: number;
    voteDurationHours: number;
    voteDurationMinutes: number;
    entryTribute: number;
    exitTribute: number;
    reserveTokenContract: string;
    reserveRatio: number;
    reserveInitialSupply: number;
    reserveTokenAbi: Abi;
}

export default function useLaunchSteps({
    tokenName,
    tokenSymbol,
    daoName,
    holderAddresses,
    holderAmounts,
    supportRequiredPct,
    minAcceptQuorumPct,
    voteDurationDays,
    voteDurationHours,
    voteDurationMinutes,
    entryTribute,
    exitTribute,
    reserveTokenContract,
    reserveRatio,
    reserveInitialSupply,
    reserveTokenAbi
}: DaoLaunchStepsProps) {

    const abi = parseAbi(["function newTokenAndInstsance(string,string,string,address[],uint256[],uint64[3],uint256[5])"])

    const voteDuration = calculateTimeInSeconds({
        days: voteDurationDays,
        hours: voteDurationHours,
        minutes: voteDurationMinutes
    });

    return (
        [
            {
                title: 'Raise approval',
                data: {
                    address: reserveTokenContract as `0x${string}`,
                    abi: reserveTokenAbi as Abi,
                    functionName: 'approve',
                    args: [
                        knownContracts[10].NEW_DAO_WITH_ABC as `0x${string}`,
                        parseUnits(reserveInitialSupply.toString(), 16)
                    ]
                }
            },
            {
                title: 'Launch DAO',
                data: {
                    address: knownContracts[10].NEW_DAO_WITH_ABC as `0x${string}`,
                    abi: abi,
                    functionName: 'newTokenAndInstance',
                    args: [
                        tokenName,
                        tokenSymbol,
                        daoName,
                        holderAddresses,
                        holderAmounts,
                        [
                            parseUnits(supportRequiredPct.toString(), 4),
                            parseUnits(minAcceptQuorumPct.toString(), 4),
                            voteDuration
                        ],
                        [
                            parseUnits(entryTribute.toString(), 16),
                            parseUnits(exitTribute.toString(), 16),
                            reserveTokenContract,
                            parseUnits(reserveRatio.toString(), 4),
                            parseUnits(reserveInitialSupply.toString(), 16)
                        ]
                    ]
                }
            }
        ]
    )
}