import { useRecoilValue } from "recoil";
import { newDaoAbcIsValidState, newDaoCheckedIsValidState, newDaoNameIsValidState, newDaoTokenIsValidState, newDaoVotingIsValidState } from "../recoil";


export default function useIsValid() {
    return (step: number) => {
        switch (step) {
            case 0:
                return useRecoilValue(newDaoNameIsValidState);
            case 1:
                return useRecoilValue(newDaoVotingIsValidState);
            case 2:
                return useRecoilValue(newDaoTokenIsValidState);
            case 3:
                return useRecoilValue(newDaoAbcIsValidState);
            case 4:
                return useRecoilValue(newDaoCheckedIsValidState);
            default:
                return false;
        }
    }
}
