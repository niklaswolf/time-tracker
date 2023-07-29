const startTime = ref<Date | null>(null);
const expiredTime = ref(0);
const formatted = ref(formatTime(0));
const savedTime = ref(0);
const interval = ref();
const isRunning = ref(false);
const currentTaskId = ref<string|null>(null)

export class NoTaskSelectedError extends Error {}

const INCLUDE_SECONDS = true;

export const useTimer = () => {
    const {updateTitle} = useSystemTray();
    const {addEntry} = useStore();
    const {emit} = useEvent()
    const {startIdleCheck, stopIdleCheck} = useIdleState();
    const isPaused = computed(() => !isRunning.value && savedTime.value > 0)

    /**
     * @throws NoTaskSelectedError
     */
    function startTimer() {
        if(!currentTaskId.value){
            throw new NoTaskSelectedError();
        }
        startTime.value = new Date();
        isRunning.value = true;

        formatted.value = formatTime(expiredTime.value + savedTime.value, INCLUDE_SECONDS);
        updateTitle(formatted.value + " ▶")
        emit(EVENT_TIMER_START);
        startIdleCheck();
        interval.value = setInterval(() => {
            if (startTime.value) {
                const now = new Date().getTime();
                const start = startTime.value.getTime();
                expiredTime.value = (now - start) + savedTime.value;
                formatted.value = formatTime(expiredTime.value, INCLUDE_SECONDS);
                updateTitle(formatted.value + " ▶")
            }
        }, 1000);
    }

    async function pauseTimer(): Promise<void> {
        await stopTimer(true);
    }

    function resumeTimer(): void {
        startTimer();
    }

    function stopTimer(saveTime: boolean = false): void {
        isRunning.value = false;
        clearInterval(interval.value);
        interval.value = null;
        let suffix = '';
        if (saveTime) {
            savedTime.value = expiredTime.value;
            suffix = ' ⏸'
        } else {
            if(startTime.value && currentTaskId.value){
                addEntry({
                    startTime: startTime.value,
                    endTime: new Date(),
                    taskId: currentTaskId.value
                })
            }

            savedTime.value = 0;
        }
        expiredTime.value = 0;

        formatted.value = formatTime(savedTime.value, INCLUDE_SECONDS);
        const title = formatted.value + suffix
        updateTitle(title)
        stopIdleCheck();
        emit(EVENT_TIMER_STOP);
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
        formatted,
        currentTaskId
    }
}
