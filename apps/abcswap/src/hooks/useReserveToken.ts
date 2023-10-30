import { parseAbiItem } from 'viem';
import { getPublicClient } from '@wagmi/core'
import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { FROM_BLOCK } from '../constants';

export function useReserveToken(bondingCurve: `0x${string}` | undefined) {

    const [address, setAddress] = useState<`0x${string}` | undefined>(undefined);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useAsyncEffect(async function(isMounted) {
        try {
            if (!bondingCurve) {
                setAddress(undefined);
                setIsLoading(false);
                setError(null);
                return;
            }
            setIsLoading(true);
            const publicClient = getPublicClient();
            const logs = await publicClient.getLogs({
                address: bondingCurve,
                event: parseAbiItem('event AddCollateralToken(address indexed collateral, uint256 virtualSupply, uint256 virtualBalance, uint32 reserveRatio)'),
                fromBlock: FROM_BLOCK
            });
            if (!isMounted()) return;
            const collateral = logs && logs.length > 0 ? logs[0].args.collateral : undefined;
            setAddress(collateral);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    }, [bondingCurve]);

    return {address, error, isLoading};
}
