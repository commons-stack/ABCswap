import { selector } from "recoil";
import newDaoCheckedAtom from "./atom";

export default selector({
    key: 'newDaoCheckedIsValid',
    get: ({get}) => {
        const checks = get(newDaoCheckedAtom);
        return checks.daoInfoChecked && checks.legalsChecked;
    },
});
