import { useAccount, useBalance } from 'wagmi';
import { parseUnits } from 'viem';
import useDebounce from './useDebounce';

/**
 * A custom React hook that checks if the user's token balance is enough for a given value.
 * @param value - The value to check if the balance is enough for.
 * @param token - The token address to check the balance of.
 * @param decimals - The number of decimals for the token.
 * @returns An object containing the `isEnough`, `error`, and `isLoading` properties.
 * - `isEnough` is a boolean indicating if the balance is enough for the given value.
 * - `error` is an error object if there was an error fetching the balance.
 * - `isLoading` is a boolean indicating if the balance is currently being fetched.
 */
function useIsBalanceEnough({value, token, decimals}: {value: string, token: `0x${string}`, decimals: number}, delay?: number) {

  const [debouncedValue, isDebouncing] = useDebounce(value, delay);
  const { address } = useAccount()
  const { data: balance, error, isLoading: isFetching } = useBalance({address, token});

  const isLoading = !address || isFetching || isDebouncing;
  const isEnough = !isLoading && token && balance ? balance.value >= parseUnits(debouncedValue, decimals) : undefined;

  return { isEnough, error, isLoading };
}

export default useIsBalanceEnough;
