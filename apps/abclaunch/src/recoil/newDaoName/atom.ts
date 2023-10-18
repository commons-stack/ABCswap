import { atom } from "recoil";

type NewDaoName = {
    name: string;
    isRegistered: boolean | undefined;
};

export default atom<NewDaoName>({
    key: 'newDaoName',
    default: {
        name: '',
        isRegistered: false,
    },
});
