import { atom } from "recoil";

type NewDaoVoting = {
    supportRequired: string;
    minimumAcceptanceQuorum: string;
    voteDurationDays: string;
    voteDurationHours: string;
    voteDurationMinutes: string;
}

export default atom<NewDaoVoting>({
    key: 'newDaoVoting',
    default: {
      supportRequired: '50',
      minimumAcceptanceQuorum: '15',
      voteDurationDays: '3',
      voteDurationHours: '0',
      voteDurationMinutes: '0',
    }
  });