import { selector } from "recoil";
import newDaoVotingAtom from "./atom";
import { newDaoVotingDurationState } from ".";

// Voting is valid if supportRequired, minimumAcceptanceQuorum and duration are all greater than 0

export default selector({
    key: 'newDaoVotingIsValid',
    get: ({get}) => {
        const settings = get(newDaoVotingAtom);
        const duration = get(newDaoVotingDurationState);
        return Number(settings.supportRequired) > 0 && Number(settings.minimumAcceptanceQuorum) > 0 && duration > 0;
    },
});
