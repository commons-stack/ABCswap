import { atom } from "recoil";

export default atom<{
    name: string;
}>({
    key: 'newDaoCreated',
    default: {
        name: ''
    }
});