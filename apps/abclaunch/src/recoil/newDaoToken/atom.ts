import { atom } from "recoil";

type NewDaoToken = {
    tokenName: string;
    tokenSymbol: string;
    tokenHolders: [string, string][];
}

export default atom<NewDaoToken>({
    key: 'newDaoToken',
    default: {
        tokenName: '',
        tokenSymbol: '',
        tokenHolders: [
            ['', '']
        ],
    }
});