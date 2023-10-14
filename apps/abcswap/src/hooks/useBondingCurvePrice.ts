import { useBalance, useContractRead, useToken } from "wagmi";
import { useAbcInfo } from "./useAbcInfo";
import { useCollateral } from "./useCollateral";
import { parseAbi } from "viem";

function applyFee(amount: bigint | undefined, fee: bigint): bigint | undefined {
    if (amount === undefined) {
        return undefined;
    }
    return amount - (amount * fee) / 10n ** 18n;
}

export function useBondingCurvePrice(amount: bigint, forwards = true, reserveToken: `0x${string}`, bondingCurve: `0x${string}`) {

    const {data: info} = useAbcInfo(bondingCurve);

    const { buyFeePct, sellFeePct, token: tokenAddr, reserve: reserveAddr, formula: formulaAddr } = info;

    if (buyFeePct === undefined || sellFeePct === undefined || tokenAddr === undefined || reserveAddr === undefined || formulaAddr === undefined) {
        return null;
    }

    const { data: collateral } = useCollateral(reserveToken, bondingCurve);

    const { reserveRatio, virtualBalance, virtualSupply } = collateral;

    if (reserveRatio === undefined || virtualBalance === undefined || virtualSupply === undefined) {
        return null;
    }

    const {data: abcToken } = useToken({
        address: tokenAddr
    })

    const totalSupply = abcToken?.totalSupply.value;

    if (totalSupply === undefined) {
        return null;
    }

    const { data: reserveBalance } = useBalance({
        address: reserveAddr,
        token: reserveToken
    })

    const balance = reserveBalance?.value;

    if (balance === undefined) {
        return null;
    }

    const formulaContract = {
        address: formulaAddr,
        abi: parseAbi([
            "function calculatePurchaseReturn(uint256 _supply, uint256 _connectorBalance, uint32 _connectorWeight, uint256 _depositAmount) public view returns (uint256)",
            "function calculateSaleReturn(uint256 _supply, uint256 _connectorBalance, uint32 _connectorWeight, uint256 _sellAmount) public view returns (uint256)"
        ])
    }

    if (forwards) {
        const { data: purchaseReturn } = useContractRead({
            ...formulaContract,
            functionName: 'calculatePurchaseReturn',
            args: [totalSupply + virtualSupply, balance + virtualBalance, reserveRatio, applyFee(amount, buyFeePct)!]
        })
        return purchaseReturn
    } else {
        const { data: saleReturn } = useContractRead({
            ...formulaContract,
            functionName: 'calculateSaleReturn',
            args: [totalSupply + virtualSupply, balance + virtualBalance, reserveRatio, amount]
        })
        return applyFee(saleReturn, sellFeePct);
    }
}
