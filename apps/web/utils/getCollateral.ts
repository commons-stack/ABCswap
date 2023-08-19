import { knownContracts } from '../config.json';
import bondingCurveAbi from './abi/augmented-bonding-curve.json'
import { readContract } from '@wagmi/core'
import { Abi } from 'viem';

export async function getCollateral() {
    
    if (!knownContracts) throw new Error('Known contracts not found');
    if (!knownContracts[100].COLLATERAL_TOKEN) throw new Error('Collateral token contract not found');
    if (!knownContracts[100].BONDING_CURVE) throw new Error('Bonding Curve contract not found');

    const bondingCurveContract = {
        address: knownContracts[100].BONDING_CURVE as `0x${string}`,
        abi: bondingCurveAbi as Abi
    }

    const collateral = readContract({
        ...bondingCurveContract,
        functionName: 'getCollateralToken',
        args: [knownContracts[100].COLLATERAL_TOKEN as `0x${string}`]
    }).then((data) => {
        return data;
    }).catch(err => {
        console.error(err);
    });

    return collateral;
   
}