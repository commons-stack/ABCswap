import { selector } from "recoil";
import newDaoTokenAtom from "./atom";
import { formatUnits, parseUnits } from "viem";

// Initial token supply is the sum of all token holder amounts

export default selector({
    key: 'newDaoTokenSupply',
    get: ({get}) => {
        const { tokenHolders } = get(newDaoTokenAtom);
        return formatUnits(tokenHolders.reduce((acc, [_, amount]) => acc + parseUnits(amount, 18), 0n), 18);
    },
});
