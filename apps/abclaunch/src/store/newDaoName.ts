import { atom, useAtom } from "jotai";


const nameAtom = atom('');
const isRegisteredAtom = atom<boolean | undefined>(false);

type DaoSettings = {
  name: string;
  isRegistered: boolean | undefined;
};

const daoSettingsAtom = atom(
  get => {
    const name = get(nameAtom);
    const isRegistered = get(isRegisteredAtom);
    return { name, isRegistered };
  },
  ( _get, set, newValue) => {
    const { name, isRegistered } = newValue as DaoSettings;
    set(nameAtom, name);
    set(isRegisteredAtom, isRegistered);
  }
);

const isValidNameAtom = atom(
  get => {
    const name = get(nameAtom);
    const isRegistered = get(isRegisteredAtom);
    return name.length > 0 && isRegistered === false;
  }
);

const daoUrlAtom = atom(
  get => {
    const name = get(nameAtom);
    return `https://optimism.aragon.blossom.software/#/${name}`;
  }
);

export function useNameAtom() {
  return useAtom(nameAtom);
}

export function useIsRegisteredAtom() {
  return useAtom(isRegisteredAtom);
}

export function useDaoSettingsAtom() {
  return useAtom(daoSettingsAtom);
}

export function useIsValidNameValue() {
  return useAtom(isValidNameAtom)[0];
}

export function useDaoUrlValue() {
  return useAtom(daoUrlAtom)[0];
}

