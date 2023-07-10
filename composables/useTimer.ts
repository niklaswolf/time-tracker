import {invoke} from '@tauri-apps/api'
import exp from "constants";

export const useTimer = () => {
    const startTime = ref<Date | null>(null);
    const expiredTime = ref(0);
    const savedTime = ref(0);
    const interval = ref();
    const isRunning = ref(false);
    const isPaused = computed(() => !isRunning.value && savedTime.value > 0)

    function startTimer() {
        startTime.value = new Date();
        isRunning.value = true;

        invoke('update_system_tray_title', {title: formatTime(expiredTime.value + savedTime.value)})
        interval.value = setInterval(() => {
            if (startTime.value) {
                const now = new Date().getTime();
                const start = startTime.value.getTime();
                expiredTime.value = (now - start) + savedTime.value;
                const formatted = formatTime(expiredTime.value);
                invoke('update_system_tray_title', {title: formatted})
            }

        }, 1000);
    }

    function pauseTimer(): void {
        const formatted = formatTime(expiredTime.value);
        invoke('update_system_tray_title', {title: formatted + " ⏸"})
        stopTimer(true);
    }

    function resumeTimer(): void {
        startTimer();
    }

    function stopTimer(saveTime: boolean = false): void {
        isRunning.value = false;
        clearInterval(interval.value);
        interval.value = null;
        if (saveTime) {
            savedTime.value = expiredTime.value;
        } else {
            savedTime.value = 0;
        }
        expiredTime.value = 0;
    }

    function formatTime(dateDiff: number): string {
        const _second = 1000;
        const _minute = _second * 60;
        const _hour = _minute * 60;
        const _day = _hour * 24;

        const hours = Math.floor((dateDiff % _day) / _hour).toString().padStart(2, '0');
        const minutes = Math.floor((dateDiff % _hour) / _minute).toString().padStart(2, '0');
        const seconds = Math.floor((dateDiff % _minute) / _second).toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    onBeforeUnmount(() => {
        clearInterval(interval.value);
        interval.value = null;
        isRunning.value = false;
    })

    return {
        startTimer,
        stopTimer,
        pauseTimer,
        resumeTimer,
        isRunning,
        isPaused
    }
}
