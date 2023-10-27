import { atom, useAtom } from "jotai";

const supportRequiredAtom = atom('50');
const minimumAcceptanceQuorumAtom = atom('15');
const voteDurationDaysAtom = atom('3');
const voteDurationHoursAtom = atom('0');
const voteDurationMinutesAtom = atom('0');

// Voting duration in seconds
const votingDurationAtom = atom(
    get => {
        const voteDurationDays = get(voteDurationDaysAtom);
        const voteDurationHours = get(voteDurationHoursAtom);
        const voteDurationMinutes = get(voteDurationMinutesAtom);
        return Number(voteDurationDays) * 24 * 60 * 60 + Number(voteDurationHours) * 60 * 60 + Number(voteDurationMinutes) * 60;
    }
);

const isValidVotingAtom = atom(
    get => {
        const supportRequired = get(supportRequiredAtom);
        const minimumAcceptanceQuorum = get(minimumAcceptanceQuorumAtom);
        const duration = get(votingDurationAtom);
        return Number(supportRequired) > 0 && Number(minimumAcceptanceQuorum) > 0 && duration > 0;
    },
);

export function useSupportRequiredAtom() {
    return useAtom(supportRequiredAtom);
}

export function useMinimumAcceptanceQuorumAtom() {
    return useAtom(minimumAcceptanceQuorumAtom);
}

export function useVoteDurationDaysAtom() {
    return useAtom(voteDurationDaysAtom);
}

export function useVoteDurationHoursAtom() {
    return useAtom(voteDurationHoursAtom);
}

export function useVoteDurationMinutesAtom() {
    return useAtom(voteDurationMinutesAtom);
}

export function useVotingDurationValue() {
    return useAtom(votingDurationAtom)[0];
}

export function useIsValidVotingValue() {
    return useAtom(isValidVotingAtom)[0];
}

export function useVotingSettingsValue() {
    return {
        supportRequired: useSupportRequiredAtom()[0],
        minimumAcceptanceQuorum: useMinimumAcceptanceQuorumAtom()[0],
        voteDurationDays: useVoteDurationDaysAtom()[0],
        voteDurationHours: useVoteDurationHoursAtom()[0],
        voteDurationMinutes: useVoteDurationMinutesAtom()[0]
    };
}