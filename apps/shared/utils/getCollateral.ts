import { knownContracts } from '../config.json';
import bondingCurveAbi from './abi/augmented-bonding-curve.json'
import { readContract } from '@wagmi/core'
import { Abi } from 'viem';

export async function getCollateral(): Promise<[boolean, bigint, bigint, number]> {
    
    if (!knownContracts) throw new Error('Known contracts not found');
    if (!knownContracts[100].COLLATERAL_TOKEN) throw new Error('Collateral token contract not found');
    if (!knownContracts[100].BONDING_CURVE) throw new Error('Bonding Curve contract not found');

    const [ whitelist, virtualBalance, virtualSupply, reserveRatio ] = await readContract({
        address: knownContracts[100].BONDING_CURVE as `0x${string}`,
        abi: bondingCurveAbi as Abi,
        functionName: 'getCollateralToken',
        args: [knownContracts[100].COLLATERAL_TOKEN as `0x${string}`]
    }) as [boolean, bigint, bigint, number];

    return [ whitelist, virtualBalance, virtualSupply, reserveRatio ];
}