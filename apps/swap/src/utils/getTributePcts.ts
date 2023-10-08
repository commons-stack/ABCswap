import { knownContracts } from '../../../shared/config.json';
import bondingCurveAbi from '../../../shared/src/utils/abi/augmented-bonding-curve.json'
import { readContract } from '@wagmi/core'
import { Abi } from 'viem'

export async function getTributePcts(): Promise<[bigint, bigint]> {

    if (!knownContracts) throw new Error('Known contracts not found');
    if (!knownContracts[100].BONDING_CURVE) throw new Error('Bonding Curve contract not found');

    const bondingCurveContract = {
        address: knownContracts[100].BONDING_CURVE as `0x${string}`,
        abi: bondingCurveAbi as Abi
    }

    const sellFeePct = await readContract({
        ...bondingCurveContract,
        functionName: 'sellFeePct'
    }) as bigint; 

    const buyFeePct = await readContract({
        ...bondingCurveContract,
        functionName: 'buyFeePct'
    }) as bigint;

    return [sellFeePct, buyFeePct];
}