import { selector } from "recoil";
import votingSettingsAtom from "./atom";

// Voting duration in seconds

export default selector({
    key: 'newDaoVotingDuration',
    get: ({get}) => {
        const { voteDurationDays, voteDurationHours, voteDurationMinutes } = get(votingSettingsAtom);
        return Number(voteDurationDays) * 24 * 60 * 60 + Number(voteDurationHours) * 60 * 60 + Number(voteDurationMinutes) * 60;
    },
});
