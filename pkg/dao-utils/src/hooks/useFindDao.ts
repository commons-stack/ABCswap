import { useEffect, useState } from 'react';
import { parseAbi } from 'viem';
import { useContractRead } from 'wagmi';
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

import namehash from '@deamtest/ens-namehash';

function useFindDao(name: string) {
  const [address, setAddress] = useState<(`0x${string}` | 'not_found' | 'loading' | undefined)>(undefined);


  const { data, isError, isLoading } = useContractRead({
    address: '0x6f2CA655f58d5fb94A08460aC19A552EB19909FD',
    abi: parseAbi([
      'function resolver(bytes32 _node) view returns (address)'
    ]),
    functionName: 'resolver',
    args: [namehash.hash(namehash.normalize(name + '.aragonid.eth')) as `0x${string}`]
  });

  useEffect(() => {
    if (isError) {
      setAddress('not_found');
    }
    else if (isLoading) {
      setAddress('loading');
    }
    else if (!data) {
      setAddress('not_found');
    }
    else if (data == "0x0000000000000000000000000000000000000000") {
      setAddress('not_found');
    }
    else {
      setAddress(data);
    }
    
  }, [data, isError, isLoading]);

  return { address };
}

export default useFindDao;
