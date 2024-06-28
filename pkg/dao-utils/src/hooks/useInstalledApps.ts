import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_GRAPHQL_API_KEY;

if (!API_KEY) {
    throw new Error('VITE_GRAPHQL_API_KEY is not set');
}

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
                const data = await fetch(`https://gateway-arbitrum.network.thegraph.com/api/${API_KEY}/subgraphs/id/Dzbv16HCmTtxqUC1Cf1LpuyfADvbSkY9KguR8MsrrMEQ`, {
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
