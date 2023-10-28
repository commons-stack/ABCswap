import { atom, useAtom } from "jotai";

const nameAtom = atom('');
const daoExistsAtom = atom<boolean | undefined>(undefined);
const appIsInstalledAtom = atom<boolean | undefined>(undefined);

type DaoSettings = {
  name: string;
  daoExists: boolean | undefined;
  appIsInstalled: boolean | undefined;
};

const daoSettingsAtom = atom(
  get => {
    return {
      name: get(nameAtom),
      daoExists: get(daoExistsAtom),
      appIsInstalled: get(appIsInstalledAtom),
    };
  },
  ( _get, set, newValue) => {
    const { name, daoExists, appIsInstalled } = newValue as DaoSettings;
    set(nameAtom, name);
    set(daoExistsAtom, daoExists);
    set(appIsInstalledAtom, appIsInstalled);
  }
);

const isValidNonRegisteredNameAtom = atom(
  get => {
    const name = get(nameAtom);
    const daoExists = get(daoExistsAtom);
    return name.length > 0 && daoExists === false;
  }
);

const isValidRegisteredWithoutAbcNameAtom = atom(
  get => {
    const name = get(nameAtom);
    const daoExists = get(daoExistsAtom);
    const appIsInstalled = get(appIsInstalledAtom);
    return name.length > 0 && daoExists == true && appIsInstalled === false;
  }
);

const isValidRegisteredWithAbcNameAtom = atom(
  get => {
    const name = get(nameAtom);
    const daoExists = get(daoExistsAtom);
    const appIsInstalled = get(appIsInstalledAtom);
    return name.length > 0 && daoExists == true && appIsInstalled == true;
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

export function useDaoExistsAtom() {
  return useAtom(daoExistsAtom);
}

export function useAppIsInstalledAtom() {
  return useAtom(appIsInstalledAtom);
}

export function useDaoSettingsAtom() {
  return useAtom(daoSettingsAtom);
}

export function useIsValidNameValue(type: 'non-registered' | 'registered-without-abc' | 'registered-with-abc') {
  const atom = type === 'non-registered' ? isValidNonRegisteredNameAtom : type === 'registered-without-abc' ? isValidRegisteredWithoutAbcNameAtom : isValidRegisteredWithAbcNameAtom;
  return useAtom(atom)[0];
}

export function useDaoUrlValue() {
  return useAtom(daoUrlAtom)[0];
}

