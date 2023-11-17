import { atom, useAtom } from "jotai";

const daoInfoCheckedAtom = atom(false);
const legalsCheckedAtom = atom(false);
const daoCreatedAtom = atom(false);

const isValidIsCheckedAtom = atom(
    get => {
        return get(daoInfoCheckedAtom) && get(legalsCheckedAtom);
    },
);

export function useDaoInfoCheckedAtom() {
    return useAtom(daoInfoCheckedAtom);
}

export function useLegalsCheckedAtom() {
    return useAtom(legalsCheckedAtom);
}

export function useDaoCreatedAtom() {
    return useAtom(daoCreatedAtom);
}

export function useIsValidIsCheckedValue() {
    return useAtom(isValidIsCheckedAtom)[0];
}