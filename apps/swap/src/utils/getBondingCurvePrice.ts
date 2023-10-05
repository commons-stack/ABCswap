import { knownContracts } from '../../../shared/config.json';
import { readContract } from '@wagmi/core';
import { Abi } from 'viem';
import bancorAbi from '../../../shared/utils/abi/bancor.json'
import tokenAbi from '../../../shared/utils/abi/token.json'

type BondingCurvePriceProps = {
    amount: bigint,
    entryTribute: bigint,
    exitTribute: bigint,
    virtualBalance: bigint,
    virtualSupply: bigint,
    reserveRatio: number,
    forwards: boolean
}

// Helper function
const PCT_BASE = BigInt(1e18);

function applyTribute(amount: bigint, tribute: bigint): bigint {
    const appliedTribute = amount - ((amount * tribute) / PCT_BASE);
    return appliedTribute;
}

export async function getBondingCurvePrice(
    {
        amount,
        entryTribute,
        exitTribute,
        virtualBalance,
        virtualSupply,
        reserveRatio, 
        forwards = true
    }: BondingCurvePriceProps): Promise<bigint> {

    if (!knownContracts) throw new Error('Known contracts not found');
    if (!knownContracts[100].BONDED_TOKEN) throw new Error('Bonded token contract not found');
    if (!knownContracts[100].COLLATERAL_TOKEN) throw new Error('Collateral token contract not found');
    if (!knownContracts[100].BANCOR_FORMULA) throw new Error('Collateral token contract not found');
    if (!knownContracts[100].BONDING_CURVE_RESERVE) throw new Error('Bonding Curve reserve contract not found');

    const bondedTotalSuply = await readContract({
        address: knownContracts[100].BONDED_TOKEN as `0x${string}`,
        abi: tokenAbi as Abi,
        functionName: 'totalSupply'
    });

    const bondedBalance = await readContract({
        address: knownContracts[100].COLLATERAL_TOKEN as `0x${string}`,
        abi: tokenAbi as Abi,
        functionName: 'balanceOf',
        args: [knownContracts[100].BONDING_CURVE_RESERVE as `0x${string}`]
    });

    if(typeof(bondedTotalSuply) !== 'bigint' || typeof(bondedBalance) !== 'bigint') throw new Error('Invalid data type');
    
    const appliedTribute = applyTribute(amount, entryTribute);

    if(forwards) {
        const purchaseReturn = await readContract({
            address: knownContracts[100].BANCOR_FORMULA as `0x${string}`,
            abi: bancorAbi as Abi,
            functionName: 'calculatePurchaseReturn',
            args: [bondedTotalSuply + virtualSupply, bondedBalance + virtualBalance, reserveRatio, appliedTribute]
        }) as bigint;

        return purchaseReturn;

    } else {
        const saleReturn = await readContract({
            address: knownContracts[100].BANCOR_FORMULA as `0x${string}`,
            abi: bancorAbi as Abi,
            functionName: 'calculateSaleReturn',
            args: [bondedTotalSuply + virtualSupply, bondedBalance + virtualBalance, reserveRatio, amount]
        }) as bigint;

        const saleReturnAmount = applyTribute(saleReturn, exitTribute);

        return saleReturnAmount;
    }

}