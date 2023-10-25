import { parseAbi } from 'viem'
import { useContractReads } from 'wagmi';

export function useAbcInfo(bondingCurve: `0x${string}` | undefined) {

    const bondingCurveContract = {
        address: bondingCurve,
        abi: parseAbi([
            "function buyFeePct() view returns (uint256)",
            "function sellFeePct() view returns (uint256)",
            "function token() view returns (address)",
            "function reserve() view returns (address)",
            "function formula() view returns (address)"
        ])
    }

    const { data, isError, isLoading } = useContractReads({
        enabled: !!bondingCurve,
        contracts: [
          {
            ...bondingCurveContract,
            functionName: 'buyFeePct',
          },
          {
            ...bondingCurveContract,
            functionName: 'sellFeePct',
          },
          {
            ...bondingCurveContract,
            functionName: 'token',
          },
          {
            ...bondingCurveContract,
            functionName: 'reserve',
          },
          {
            ...bondingCurveContract,
            functionName: 'formula',
          }
        ],
      })

    return { data: {
        buyFeePct: data && data[0].result as bigint,
        sellFeePct: data && data[1].result as bigint,
        token: data && data[2].result as `0x${string}`,
        reserve: data && data[3].result as `0x${string}`,
        formula: data && data[4].result as `0x${string}`
    }, isError, isLoading };
}