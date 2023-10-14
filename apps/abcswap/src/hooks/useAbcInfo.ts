import { parseAbi } from 'viem'
import { useContractReads } from 'wagmi';

export function useAbcInfo(bondingCurve: `0x${string}`) {

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
        buyFeePct: data && data[0].result,
        sellFeePct: data && data[1].result,
        token: data && data[2].result,
        reserve: data && data[3].result,
        formula: data && data[4].result
    }, isError, isLoading };
}