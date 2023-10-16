import { sha3_256 } from 'js-sha3';
import { useEffect, useState } from 'react';
import { parseAbi } from 'viem';
import { useContractRead } from 'wagmi';

function nameHash(name: string): `0x${string}` {
  if (name === '') {
    return '0x0000000000000000000000000000000000000000';
  }
  const labelHash = name.split('.')[0];
  const firstPeriod = name.indexOf('.');
  const remainder = firstPeriod >= 0 ? name.slice(name.indexOf('.') + 1) : "";
  const result = sha3_256(nameHash(remainder) + sha3_256(labelHash));
  console.log('sha3_256 of ', name, ' is ', ('0x' + result))
  return ('0x' + result) as `0x${string}`;
}

function useFindDao(name: string) {
  const [address, setAddress] = useState<(`0x${string}` | 'not_found' | 'loading' | undefined)>(undefined);

  const { data, isError, isLoading } = useContractRead({
    address: '0x6f2CA655f58d5fb94A08460aC19A552EB19909FD',
    abi: parseAbi([
      'function resolver(bytes32 _node) view returns (address)'
    ]),
    functionName: 'resolver',
    args: [nameHash(name + '.aragonid.eth')]
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
