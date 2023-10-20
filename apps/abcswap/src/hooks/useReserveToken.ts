import { parseAbiItem } from 'viem';
import { getPublicClient } from '@wagmi/core'
import { useState, useEffect } from 'react';
import { FROM_BLOCK } from '../constants';

export function useReserveToken(bondingCurve: `0x${string}` | undefined) {

    const [address, setAddress] = useState<`0x${string}` | undefined>(undefined);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async function() {
            try {
                setIsLoading(true);
                const publicClient = getPublicClient();
                const logs = await publicClient.getLogs({
                    address: bondingCurve,
                    event: parseAbiItem('event AddCollateralToken(address indexed collateral, uint256 virtualSupply, uint256 virtualBalance, uint32 reserveRatio)'),
                    fromBlock: FROM_BLOCK
                });

                if (logs && logs.length > 0) {
                    const { collateral } = logs[0].args;
                    if (collateral) {
                        setAddress(collateral);
                    } else {
                        setAddress(undefined);
                    }
                } else {
                    setAddress(undefined);
                }
            } catch (e) {
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [bondingCurve]);

    return {address, error, isLoading};
}
