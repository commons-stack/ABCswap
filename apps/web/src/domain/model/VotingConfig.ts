const DEFAULT_SUPPORT_REQUIRED = 50;
const DEFAULT_MINIMUM_ACCEPTANCE_QUORUM = 15;
const DEFAULT_VOTE_DURATION_MINUTES = 60 * 24 * 7; // 7 days

export class VotingConfig {
    supportRequired: number;
    minimumAcceptanceQuorum: number;
    voteDurationMinutes: number;

    constructor(supportRequired?: number, minimumAcceptanceQuorum?: number, voteDurationMinutes?: number) {
        this.supportRequired = supportRequired ?? DEFAULT_SUPPORT_REQUIRED;
        this.minimumAcceptanceQuorum = minimumAcceptanceQuorum ?? DEFAULT_MINIMUM_ACCEPTANCE_QUORUM;
        this.voteDurationMinutes = voteDurationMinutes ?? DEFAULT_VOTE_DURATION_MINUTES;
    }

    // setting values
    public setSupportRequiredValue(value: number): void {
        this.supportRequired = value;
    }

    public setMinimumAcceptanceQuorumValue(value: number): void {
        this.minimumAcceptanceQuorum = value;
    }

    public setVoteDurationDays(value: number): void {
        this.voteDurationMinutes = (this.voteDurationMinutes % (60*24)) + (value * 60 * 24);
    }

    public setVoteDurationHours(value: number): void {
        const oldDaysInMinutes = (this.voteDurationMinutes - (this.voteDurationMinutes % (60 * 24)));
        const newHoursInMinutes = value * 60;
        const oldMinutes = this.voteDurationMinutes % 60;
        this.voteDurationMinutes = oldDaysInMinutes + newHoursInMinutes + oldMinutes;
    }

    public setVoteDurationMinutes(value: number): void {
        const oldDaysInMinutes = (this.voteDurationMinutes - (this.voteDurationMinutes % (60 * 24)));
        const oldHoursInMinutes = (this.voteDurationMinutes - (this.voteDurationMinutes % 60)) - oldDaysInMinutes;
        this.voteDurationMinutes = oldDaysInMinutes + oldHoursInMinutes + value;
    }

    // getting values
    public getSupportRequiredValue(): number {
        return this.supportRequired;
    }

    public getMinimumAcceptanceQuorumValue(): number {
        return this.minimumAcceptanceQuorum;
    }

    public getVoteDurationDays(): number {
        return this.voteDurationMinutes / 60 / 24;
    }

    public getVoteDurationHours(): number {
        return (this.voteDurationMinutes / 60)%24;
    }

    public getVoteDurationMinutes(): number {
        return this.voteDurationMinutes % 60;
    }

    public getVoteTotalDurationInSeconds(): number {ç
        return this.voteDurationMinutes * 60;
    }
}