import { atom } from "recoil";

type NewDaoAbcData = {
    reserveRatio: string;
    reserveInitialBalance: string;
    entryTribute: string;
    exitTribute: string;
    collateralToken: string;
}

export default atom<NewDaoAbcData>({
    key: 'newDaoAbc',
    default: {
        reserveRatio: '20',
        reserveInitialBalance: '0',
        entryTribute: '0',
        exitTribute: '0',
        collateralToken: `0x${'0'.repeat(40)}`,
    }
});