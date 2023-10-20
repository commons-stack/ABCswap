import { useBalance, useToken } from "wagmi";
import { readContract } from '@wagmi/core';
import { useAbcInfo } from "./useAbcInfo";
import { useCollateral } from "./useCollateral";
import { parseAbi } from "viem";
import { useEffect, useState } from "react";

function applyFee(amount: bigint | undefined, fee: bigint): bigint | undefined {
    if (amount === undefined) {
        return undefined;
    }
    return amount - (amount * fee) / 10n ** 18n;
}

export function useBondingCurvePrice(amount: bigint | undefined, forwards = true, reserveToken: `0x${string}` | undefined, bondingCurve: `0x${string}` | undefined) {
    const [price, setPrice] = useState<bigint | undefined>(undefined);

    const {data: info} = useAbcInfo(bondingCurve);
    const { buyFeePct, sellFeePct, token: tokenAddr, reserve: reserveAddr, formula: formulaAddr } = info;

    const { data: collateral } = useCollateral(reserveToken, bondingCurve);
    const { reserveRatio, virtualBalance, virtualSupply } = collateral;

    const {data: abcToken } = useToken({ address: tokenAddr });
    const totalSupply = abcToken?.totalSupply.value;

    const { data: reserveBalance } = useBalance({ address: reserveAddr, token: reserveToken });
    const balance = reserveBalance?.value;

    const formulaContract = {
        abi: parseAbi([
            "function calculatePurchaseReturn(uint256 _supply, uint256 _connectorBalance, uint32 _connectorWeight, uint256 _depositAmount) public view returns (uint256)",
            "function calculateSaleReturn(uint256 _supply, uint256 _connectorBalance, uint32 _connectorWeight, uint256 _sellAmount) public view returns (uint256)"
        ])
    };

    useEffect(() => {
        if (
            buyFeePct !== undefined &&
            sellFeePct !== undefined &&
            tokenAddr !== undefined &&
            reserveAddr !== undefined &&
            formulaAddr !== undefined &&
            reserveRatio !== undefined &&
            virtualBalance !== undefined &&
            virtualSupply !== undefined &&
            totalSupply !== undefined &&
            balance !== undefined &&
            formulaAddr !== undefined
        ) {
            (async () => {
                if (forwards) {
                    const purchaseReturn = await readContract({
                        ...formulaContract,
                        address: formulaAddr,
                        functionName: 'calculatePurchaseReturn',
                        args: [totalSupply + virtualSupply, balance + virtualBalance, reserveRatio, applyFee(amount, buyFeePct)!]
                    })
                    setPrice(purchaseReturn);
                } else {
                    const saleReturn = await readContract({
                        ...formulaContract,
                        address: formulaAddr,
                        functionName: 'calculateSaleReturn',
                        args: [totalSupply + virtualSupply, balance + virtualBalance, reserveRatio, amount || 0n]
                    })
                    setPrice(applyFee(saleReturn, sellFeePct));
                }
            })();
        }
    }, [buyFeePct, sellFeePct, tokenAddr, reserveAddr, formulaAddr, reserveRatio, virtualBalance, virtualSupply, totalSupply, balance, amount, forwards]);

    return price;
}
