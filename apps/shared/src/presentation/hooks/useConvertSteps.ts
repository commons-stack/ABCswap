import { knownContracts } from '../../../config.json';
import bondingCurveAbi from '../../utils/abi/augmented-bonding-curve.json';
import tokenAbi from '../../utils/abi/token.json';
import { Abi, parseUnits } from 'viem';

export default function useConvertSteps(toSymbol: string, fromAmount: string, account: `0x${string}` | undefined, bonded: { symbol: string, contract: `0x${string}` }) {
    return (toSymbol === bonded.symbol) ?
        [
            {
                title: 'Raise approval',
                data: {
                    address: knownContracts[100].COLLATERAL_TOKEN as `0x${string}`,
                    abi: tokenAbi as Abi,
                    functionName: 'approve',
                    args: [
                        knownContracts[100].BONDING_CURVE as `0x${string}`,
                        parseUnits(fromAmount, 18)
                    ]
                }
            },
            {
                title: 'Make buy order',
                data: {
                    address: knownContracts[100].BONDING_CURVE as `0x${string}`,
                    abi: bondingCurveAbi as Abi,
                    functionName: 'makeBuyOrder',
                    args: [
                        account as `0x${string}`,
                        knownContracts[100].COLLATERAL_TOKEN as `0x${string}`,
                        parseUnits(fromAmount, 18),
                        parseUnits("0", 18)
                    ],
                }
            }
        ] : [
            {
                title: 'Make sell order',
                data: {
                    address: knownContracts[100].BONDING_CURVE as `0x${string}`,
                    abi: bondingCurveAbi as Abi,
                    functionName: 'makeSellOrder',
                    args: [
                        account as `0x${string}`,
                        knownContracts[100].COLLATERAL_TOKEN as `0x${string}`,
                        parseUnits(fromAmount, 18),
                        parseUnits("0", 18)
                    ]
                }
            }
        ];
    }