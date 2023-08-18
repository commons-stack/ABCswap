import { knownContracts } from '../config.json';
import bondingCurveAbi from './abi/augmented-bonding-curve.json'
import { readContracts } from '@wagmi/core'
import { Abi } from 'viem'

export async function getTributePcts() {

    if (!knownContracts) throw new Error('Known contracts not found');
    if (!knownContracts[100].BONDING_CURVE) throw new Error('Bonding Curve contract not found');

    const bondingCurveContract = {
        address: knownContracts[100].BONDING_CURVE as `0x${string}`,
        abi: bondingCurveAbi as Abi
    }

    const tributes = readContracts({
        contracts: [
            {
                ...bondingCurveContract,
                functionName: 'sellFeePct'
            },
            {
                ...bondingCurveContract,
                functionName: 'buyFeePct'
            }
        ]
    }).then(data => {
        return data
    }).catch(err => {
        console.error(err);
    });

    return tributes;
}