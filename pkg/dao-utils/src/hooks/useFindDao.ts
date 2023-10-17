import { parseAbi } from 'viem';
import { useContractRead } from 'wagmi';
import { namehash, normalize } from 'viem/ens'

function useFindDao(name: string) {
  const { data, isError, isLoading } = useContractRead({
    address: '0x6f2CA655f58d5fb94A08460aC19A552EB19909FD',
    abi: parseAbi([
      'function resolver(bytes32 _node) view returns (address)'
    ]),
    functionName: 'resolver',
    args: [namehash(name.length > 0?normalize(`${name}.aragonid.eth`):'') as `0x${string}`]
  });

  return { data, isError, isLoading };
}

export default useFindDao;
