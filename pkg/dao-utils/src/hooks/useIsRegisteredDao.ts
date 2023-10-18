
import { useDebounce } from 'usehooks-ts';
import {  parseAbi } from 'viem';
import { namehash, normalize } from 'viem/ens';
import { useContractRead } from 'wagmi';

const aragonEnsContract = '0x6f2CA655f58d5fb94A08460aC19A552EB19909FD';
const zeroAddress = `0x${'0'.repeat(40)}`;

function useIsRegisteredDao(name: string) {

  const {data, error, isLoading } = useContractRead({
    address: aragonEnsContract,
    abi: parseAbi([
      'function resolver(bytes32 _node) view returns (address)'
    ]),
    functionName: 'resolver',
    args: [namehash(name.length > 0 ? normalize(`${name}.aragonid.eth`) : '')]
  });

  const isRegistered = data && data !== zeroAddress;

  return { isRegistered, error, isLoading };
}

function useDebouncedIsRegisteredDao(name: string, delay?: number) {
  const debounceDaoName = useDebounce(name, delay);
  return useIsRegisteredDao(debounceDaoName);
}

export default useDebouncedIsRegisteredDao;
