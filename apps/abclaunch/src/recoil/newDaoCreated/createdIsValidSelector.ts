import { selector } from "recoil";
import newDaoNameAtom from "./atom";

export default selector({
    key: 'newDaoCreatedIsValid',
    get: ({get}) => {
        const {name} = get(newDaoNameAtom);
        return name.length > 0;
    },
});
