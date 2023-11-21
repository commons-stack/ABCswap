import { useState, useEffect } from 'react';

export default function useInstalledApps(kernel?: `0x${string}`) {
    const [appAddresses, setAppAddresses] = useState<{[appId: string]: `0x${string}`[]}>({});
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        let isCancelled = false;
        (async () => {
            try {
                if (!kernel) {
                    setAppAddresses({});
                    setIsLoading(false);
                    setError(null);
                    return;
                }
                setIsLoading(true);
                const data = await fetch('https://api.thegraph.com/subgraphs/name/blossomlabs/aragon-optimism', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: `{
                            organization(id: "${kernel.toLowerCase()}") {
                              apps {
                                address
                                repoName
                                repo {
                                  registry {
                                    name
                                  }
                                }
                              }
                            }
                        }`
                    })
                });
                const json = await data.json();
                const apps = json.data.organization.apps;
                const proxiesByAppId: {[appId: string]: `0x${string}`[]} = apps.reduce((acc: {[appId: string]: `0x${string}`[]}, app: any) => {
                    const registryName = app.repo?.registry?.name;
                    const appId = registryName ? `${app.repoName}.${registryName}` : app.repoName;
                    if (!acc[appId]) {
                        acc[appId] = [];
                    }
                    acc[appId].push(app.address);
                    return acc;
                }, {});
                if (isCancelled) return;
                setAppAddresses(proxiesByAppId);
            } catch (e) {
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        })();
        return () => {
            isCancelled = true;
        };
    }, [kernel]);

    return { appAddresses, error, isLoading };
}
