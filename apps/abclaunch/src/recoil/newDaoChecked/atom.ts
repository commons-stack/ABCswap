import { atom } from "recoil";

type NewDaoCheckedState = {
    daoInfoChecked: boolean;
    legalsChecked: boolean;
};

export default atom<NewDaoCheckedState>({
    key: 'newDaoChecked',
    default: {
        daoInfoChecked: false,
        legalsChecked: false,
    }
});
