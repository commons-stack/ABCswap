import { useEffect, useState } from 'react';
import { createPublicClient, http, parseAbi } from 'viem';
import { optimism } from 'viem/chains';
import { namehash, normalize } from 'viem/ens';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
})

function useDaoIsRegistered() {
  const [isRegistered, setIsRegistered] = useState<boolean|undefined>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function cleanState(){
    setIsRegistered(undefined);
    setIsError(false);
    setIsLoading(false);
  }

  async function isDaoRegistered(name: string){
    if(name.length === 0) {
      setIsRegistered(undefined);
      setIsError(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setIsRegistered(undefined);

    const ensResolver = await publicClient.readContract({
      address: '0x6f2CA655f58d5fb94A08460aC19A552EB19909FD',
      abi: parseAbi([
        'function resolver(bytes32 _node) view returns (address)'
      ]),
      functionName: 'resolver',
      args: [namehash(name.length > 0?normalize(`${name}.aragonid.eth`):'') as `0x${string}`]
    });
    const isResolverValid = ensResolver !== "0x0000000000000000000000000000000000000000" 
    setIsRegistered(isResolverValid);
    setIsError(!isResolverValid)
    setIsLoading(false);
  }

  return { isRegistered, isError, isLoading, isDaoRegistered, cleanState };
}

export default useDaoIsRegistered;
