import { atom, useAtom } from "jotai";

const reserveRatioAtom = atom('20');
const reserveInitialBalanceAtom = atom<[string, boolean | undefined]>(['0', true]);
const entryTributeAtom = atom('0');
const exitTributeAtom = atom('0');
const collateralTokenAtom = atom<string | undefined>(undefined);

const isValidAbcAtom = atom(
    get => {
        const reserveRatio = get(reserveRatioAtom);
        const [reserveInitialBalance, reserveInitialBalanceIsEnough] = get(reserveInitialBalanceAtom);
        const entryTribute = get(entryTributeAtom);
        const exitTribute = get(exitTributeAtom);
        const collateralToken = get(collateralTokenAtom);
        return Number(entryTribute) <= 100 && Number(exitTribute) <= 100 && Number(reserveRatio) <= 100
            && Number(entryTribute) >= 0 && Number(exitTribute) >= 0 && Number(reserveRatio) >= 0 && Number(reserveInitialBalance) >= 0
            && !!collateralToken
            && !!reserveInitialBalanceIsEnough;
    },
);

export function useReserveRatioAtom() {
    return useAtom(reserveRatioAtom);
}

export function useReserveInitialBalanceAtom() {
    return useAtom(reserveInitialBalanceAtom);
}

export function useEntryTributeAtom() {
    return useAtom(entryTributeAtom);
}

export function useExitTributeAtom() {
    return useAtom(exitTributeAtom);
}

export function useCollateralTokenAtom() {
    return useAtom(collateralTokenAtom);
}

export function useIsValidAbcValue() {
    return useAtom(isValidAbcAtom)[0];
}

export function useAbcSettingsValue() {
    return {
        reserveRatio: useReserveRatioAtom()[0],
        reserveInitialBalance: useReserveInitialBalanceAtom()[0],
        entryTribute: useEntryTributeAtom()[0],
        exitTribute: useExitTributeAtom()[0],
        collateralToken: useCollateralTokenAtom()[0]
    }
}