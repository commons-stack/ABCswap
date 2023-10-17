import { selector } from "recoil";
import newDaoAbcAtom from "./atom";

export default selector({
    key: 'newDaoAbcIsValid',
    get: ({get}) => {
        const {entryTribute, exitTribute, reserveRatio, collateralToken} = get(newDaoAbcAtom);
        return Number(entryTribute) <= 100 && Number(exitTribute) <= 100 && Number(reserveRatio) <= 100
            && Number(entryTribute) >= 0 && Number(exitTribute) >= 0 && Number(reserveRatio) >= 0
            && collateralToken !== `0x${'0'.repeat(40)}`;
    },
});
