import { atom, useAtom } from "jotai";
import { formatUnits, parseUnits, isAddress } from "viem";


const tokenNameAtom = atom('');
const tokenSymbolAtom = atom('');
const tokenHoldersAtom = atom<[string, string][]>([
    ['', '']
]);

// Initial token supply is the sum of all token holder amounts
const initialTotalSupplyAtom = atom(
    get => {
        const tokenHolders = get(tokenHoldersAtom);
        return formatUnits(tokenHolders.reduce((acc, [_, amount]) => acc + parseUnits(amount, 18), 0n), 18);
    },
);

// Is valid if token name, symbol, and holders are all non-empty and valid addresses, and initial supply is greater than 0
const isValidTokenAtom = atom(
    get => {
        const tokenName = get(tokenNameAtom);
        const tokenSymbol = get(tokenSymbolAtom);
        const tokenHolders = get(tokenHoldersAtom);
        const initialSupply = get(initialTotalSupplyAtom)
        if (tokenName.length === 0 || tokenSymbol.length === 0 || tokenHolders.length === 0) {
            return false;
        }
        for (const [address, _] of tokenHolders) {
            if (!isAddress(address)) {
                return false;
            }
        }
        if (initialSupply == '0') {
            return false;
        }
        return true;
    },
);

export function useTokenNameAtom() {
    return useAtom(tokenNameAtom);
}

export function useTokenSymbolAtom() {
    return useAtom(tokenSymbolAtom);
}

export function useTokenHoldersAtom() {
    return useAtom(tokenHoldersAtom);
}

export function useInitialTotalSupplyValue() {
    return useAtom(initialTotalSupplyAtom)[0];
}

export function useIsValidTokenValue() {
    return useAtom(isValidTokenAtom)[0];
}

export function useTokenSettingsValue() {
    return {
        name: useTokenNameAtom()[0],
        symbol: useTokenSymbolAtom()[0],
        holders: useTokenHoldersAtom()[0],
        initialTotalSupply: useInitialTotalSupplyValue(),
    }
}
