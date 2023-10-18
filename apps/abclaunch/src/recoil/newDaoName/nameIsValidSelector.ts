import { selector } from "recoil";
import newDaoNameAtom from "./atom";

export default selector({
    key: 'newDaoNameIsValid',
    get: ({get}) => {
        const {name, isRegistered} = get(newDaoNameAtom);
        return name.length > 0 && isRegistered === false;
    },
});
