import { selector } from "recoil";
import newDaoNameAtom from "./atom";

export default selector({
    key: 'newDaoCreatedUrl',
    get: ({get}) => {
        const {name} = get(newDaoNameAtom);
        return `https://optimism.aragon.blossom.software/#/${name}`
    },
});
