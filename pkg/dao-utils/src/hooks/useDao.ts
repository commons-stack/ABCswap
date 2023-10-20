import { normalize, namehash } from "viem/ens";
import { parseAbi } from "viem";
import { useContractRead } from "wagmi";
import useInstalledApp from "./useInstalledApp";
import { ARAGON_ENS_CONTRACT, ZERO_ADDRESS } from "../constants";

export function useDaoAddress(name: string = "") {
  let normalizedName: string = "";
  let error: Error | null = null;

  try {
    normalizedName = name.length > 0 ? normalize(`${name}.aragonid.eth`) : "";
  } catch (e: unknown) {
    error = e as Error;
  }

  const {
    data: publicResolver,
    error: ensError,
    isLoading: ensIsLoading,
  } = useContractRead({
    address: ARAGON_ENS_CONTRACT,
    abi: parseAbi(["function resolver(bytes32 _node) view returns (address)"]),
    functionName: "resolver",
    args: [namehash(normalizedName)],
  });

  const {
    data: address,
    error: resolverError,
    isLoading: resolverIsLoading,
  } = useContractRead({
    address: publicResolver,
    abi: parseAbi(["function addr(bytes32 _node) view returns (address)"]),
    functionName: "addr",
    args: [namehash(normalizedName)],
    enabled: publicResolver !== ZERO_ADDRESS,
  });

  error = error || ensError || resolverError;
  const isLoading = ensIsLoading || resolverIsLoading;

  return { address, error, isLoading };
}

export default function useDao(name?: string, app?: string) {

    const { address: daoAddress, error: daoError, isLoading: isDaoLoading } = useDaoAddress(name);
    const { address: appAddress, error: appError, isLoading: isAppLoading } = useInstalledApp(daoAddress, app);
    const { address: tokenManagerAddress, error: tokenManagerError, isLoading: isTokenManagerLoading } = useInstalledApp(daoAddress, 'token-manager.aragonpm.eth');

    const {
        data: tokenAddress,
        error: tokenError,
        isLoading: isTokenLoading,
    } = useContractRead({
        address: tokenManagerAddress,
        abi: parseAbi([
            "function token() public view returns (address)",
        ]),
        functionName: "token"
    });

    const error = daoError || appError || tokenManagerError || tokenError;
    const isLoading = isDaoLoading || isAppLoading || isTokenManagerLoading || isTokenLoading;
    
    return { address: daoAddress, appAddress, tokenAddress, error, isLoading };
  
}
