export function formatTime(timeInMs: number, includeSeconds: boolean = false): string {
    const _second = 1000;
    const _minute = _second * 60;
    const _hour = _minute * 60;
    const _day = _hour * 24;

    const hours = Math.floor((timeInMs % _day) / _hour).toString().padStart(2, '0');
    const minutes = Math.floor((timeInMs % _hour) / _minute).toString().padStart(2, '0');

    if (includeSeconds) {
        const seconds = Math.floor((timeInMs % _minute) / _second).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}`;
}
