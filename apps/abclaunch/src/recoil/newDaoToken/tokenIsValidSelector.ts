import { selector } from "recoil";
import newDaoTokenAtom from "./atom";
import { isAddress } from 'viem'
import { newDaoTokenSupplyState } from ".";

// Is valid if token name, symbol, and holders are all non-empty and valid addresses, and initial supply is greater than 0

export default selector<boolean>({
    key: 'newDaoTokenIsValid',
    get: ({get}) => {
        const {tokenName, tokenSymbol, tokenHolders} = get(newDaoTokenAtom);
        const initialSupply = get(newDaoTokenSupplyState)
        if (tokenName.length === 0 || tokenSymbol.length === 0 || tokenHolders.length === 0) {
            return false;
        }
        for (const [address, _] of tokenHolders) {
            if (!isAddress(address)) {
                return false;
            }
        }
        if (initialSupply == 0) {
            return false;
        }
        return true;
    },
});
