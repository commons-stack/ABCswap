import { selector } from "recoil";
import newDaoTokenAtom from "./atom";

// Initial token supply is the sum of all token holder amounts

export default selector({
    key: 'newDaoTokenSupply',
    get: ({get}) => {
        const { tokenHolders } = get(newDaoTokenAtom);
        return tokenHolders.reduce((acc, [_, amount]) => acc + Number(amount), 0);
    },
});
