import { useState, useEffect } from 'react';
import { parseAbiItem } from 'viem';
import { namehash } from 'viem/ens';
import { getPublicClient } from '@wagmi/core';

import { FROM_BLOCK } from '../constants';

export default function useInstalledApp(kernel?: `0x${string}`, appId?: string) {
    const [address, setAddress] = useState<`0x${string}` | undefined>(undefined);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const publicClient = getPublicClient();
                const logs = await publicClient.getLogs({
                    address: kernel,
                    event: parseAbiItem('event NewAppProxy(address proxy, bool isUpgradeable, bytes32 appId)'),
                    fromBlock: FROM_BLOCK,
                });
                const app = appId && logs.find(log => log.args.appId === namehash(appId));
                setAddress(app ? app.args.proxy : undefined);
            } catch (e) {
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [kernel, appId]);

    return { address, error, isLoading };
}
