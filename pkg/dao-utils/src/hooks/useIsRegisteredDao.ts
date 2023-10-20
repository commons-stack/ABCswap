import { useDaoAddress } from './useDao';
import useDebounce from './useDebounce';
import { ZERO_ADDRESS } from '../constants';

function useIsRegisteredDao(name: string, delay?: number) {

  const [debouncedName, isDebouncing] = useDebounce(name, delay);

  const {
    address,
    error,
    isLoading: isFetching,
  } = useDaoAddress(debouncedName)

  const isLoading = isFetching || isDebouncing;
  const isRegistered = !isLoading && !!address && address !== ZERO_ADDRESS;

  return { isRegistered, error, isLoading };
}

export default useIsRegisteredDao;
