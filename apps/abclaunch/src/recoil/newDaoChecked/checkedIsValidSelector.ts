import { selector } from "recoil";
import newDaoCheckedAtom from "./atom";

export default selector({
    key: 'newDaoCheckedIsValid',
    get: ({get}) => {
        const checked = get(newDaoCheckedAtom);
        return checked;
    },
});
