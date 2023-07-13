import {invoke} from '@tauri-apps/api'

const startTime = ref<Date | null>(null);
const expiredTime = ref(0);
const formatted = ref(formatTime(0));
const savedTime = ref(0);
const interval = ref();
const isRunning = ref(false);

function formatTime(dateDiff: number): string {
    if(dateDiff === 0){
        return "--:--";
    }
    const _second = 1000;
    const _minute = _second * 60;
    const _hour = _minute * 60;
    const _day = _hour * 24;

    const hours = Math.floor((dateDiff % _day) / _hour).toString().padStart(2, '0');
    const minutes = Math.floor((dateDiff % _hour) / _minute).toString().padStart(2, '0');
    const seconds = Math.floor((dateDiff % _minute) / _second).toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

export const useTimer = () => {
    const isPaused = computed(() => !isRunning.value && savedTime.value > 0)

    function startTimer() {
        startTime.value = new Date();
        isRunning.value = true;

        formatted.value = formatTime(expiredTime.value + savedTime.value);
        invoke('update_system_tray_title', {title: formatted.value})
        interval.value = setInterval(() => {
            if (startTime.value) {
                const now = new Date().getTime();
                const start = startTime.value.getTime();
                expiredTime.value = (now - start) + savedTime.value;
                formatted.value = formatTime(expiredTime.value);
                invoke('update_system_tray_title', {title: formatted.value})
            }

        }, 1000);
    }

    async function pauseTimer(): Promise<void> {
        await stopTimer(true);
    }

    function resumeTimer(): void {
        startTimer();
    }

    async function stopTimer(saveTime: boolean = false): Promise<void> {
        isRunning.value = false;
        clearInterval(interval.value);
        interval.value = null;
        let suffix = '';
        if (saveTime) {
            savedTime.value = expiredTime.value;
            suffix = ' ⏸'
        } else {
            savedTime.value = 0;
        }
        expiredTime.value = 0;

        formatted.value = formatTime(savedTime.value);
        const title = formatted.value + suffix
        await invoke('update_system_tray_title', { title })
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
        isPaused,
        formatted
    }
}
