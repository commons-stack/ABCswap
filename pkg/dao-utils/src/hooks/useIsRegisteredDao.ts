import { useState, useEffect } from 'react';
import { useDebounce } from 'usehooks-ts';
import { parseAbi } from 'viem';
import { namehash, normalize } from 'viem/ens';
import { useContractRead } from 'wagmi';

const aragonEnsContract = '0x6f2CA655f58d5fb94A08460aC19A552EB19909FD';
const zeroAddress = `0x${'0'.repeat(40)}`;

function useIsRegisteredDaoWithoutDebounce(name: string) {

  let normalizedName: string = '';
  let error: Error | null = null;

  try {
    normalizedName = name.length > 0 ? normalize(`${name}.aragonid.eth`) : '';
  } catch (e: unknown) {
    error = e as Error;
  }

  const { data, error: contractError, isLoading } = useContractRead({
    address: aragonEnsContract,
    abi: parseAbi([
      'function resolver(bytes32 _node) view returns (address)'
    ]),
    functionName: 'resolver',
    args: [namehash(normalizedName)]
  });

  error = error || contractError;
  const isRegistered = data && data !== zeroAddress;

  return { isRegistered, error, isLoading };
}

function useIsRegisteredDao(name: string, delay?: number) {
  const [isDebouncing, setIsDebouncing] = useState(true);
  const debounceDaoName = useDebounce(name, delay);

  useEffect(() => {
    setIsDebouncing(true);
    const handler = setTimeout(() => setIsDebouncing(false), delay);
    return () => clearTimeout(handler);
  }, [name, delay]);

  const { isRegistered, error, isLoading: isFetching } = useIsRegisteredDaoWithoutDebounce(debounceDaoName);

  // isLoading will be true either if we're debouncing or if the request is being made
  const isLoading = isDebouncing || isFetching;

  return { isRegistered, error, isLoading };
}

export default useIsRegisteredDao;
