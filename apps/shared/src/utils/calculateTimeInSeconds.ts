type DateInput = {
    days: number;
    hours: number;
    minutes: number;
};

export default function calculateTimeInSeconds(dateInput: DateInput): number {
    const { days, hours, minutes } = dateInput;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const millisecondsPerHour = 60 * 60 * 1000;
    const millisecondsPerMinute = 60 * 1000;

    const totalMilliseconds =
        days * millisecondsPerDay +
        hours * millisecondsPerHour +
        minutes * millisecondsPerMinute;

    const seconds = totalMilliseconds / 1000;

    return seconds;
}