import { atom } from "recoil";

type NewDaoAbcData = {
    reserveRatio: string;
    reserveInitialBalance: string;
    reserveInitialBalanceIsEnough: boolean | undefined;
    entryTribute: string;
    exitTribute: string;
    collateralToken: string | undefined;
}

export default atom<NewDaoAbcData>({
    key: 'newDaoAbc',
    default: {
        reserveRatio: '20',
        reserveInitialBalance: '0',
        reserveInitialBalanceIsEnough: true,
        entryTribute: '0',
        exitTribute: '0',
        collateralToken: undefined,
    }
});