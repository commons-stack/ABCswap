import { parseAbi } from 'viem';
import { namehash, normalize } from 'viem/ens';
import { useContractRead } from 'wagmi';
import useDebounce from './useDebounce';

const aragonEnsContract = '0x6f2CA655f58d5fb94A08460aC19A552EB19909FD';
const zeroAddress = `0x${'0'.repeat(40)}`;

function useIsRegisteredDao(name: string, delay?: number) {

  const [debouncedName, isDebouncing] = useDebounce(name, delay);

  let normalizedName: string = '';
  let error: Error | null = null;

  try {
    normalizedName = debouncedName.length > 0 ? normalize(`${debouncedName}.aragonid.eth`) : '';
  } catch (e: unknown) {
    error = e as Error;
  }

  const { data, error: contractError, isLoading: isFetching } = useContractRead({
    address: aragonEnsContract,
    abi: parseAbi([
      'function resolver(bytes32 _node) view returns (address)'
    ]),
    functionName: 'resolver',
    args: [namehash(normalizedName)]
  });

  error = error || contractError;
  const isLoading = isFetching || isDebouncing;
  const isRegistered = data && data !== zeroAddress;

  return { isRegistered, error, isLoading };
}

export default useIsRegisteredDao;
