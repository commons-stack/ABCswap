import { parseAbi } from 'viem';
import { useContractRead } from 'wagmi';

export function useCollateral(reserveToken: `0x${string}`, bondingCurve: `0x${string}`) {

    const {data, isError, isLoading} = useContractRead({
        address: bondingCurve,
        abi: parseAbi([
            'function getCollateralToken(address _reserveToken) external view returns (bool whitelisted, uint256 virtualSupply, uint256 virtualBalance, uint32 reserveRatio)'
        ]),
        functionName: 'getCollateralToken',
        args: [reserveToken]
    });

    return {data: {
        whitelisted: data && data[0],
        virtualSupply: data && data[1],
        virtualBalance: data && data[2],
        reserveRatio: data && data[3]
    }, isError, isLoading};
    // return {data, isError, isLoading};
}