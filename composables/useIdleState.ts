import {invoke} from "@tauri-apps/api";

export type IDLE_EVENT_PAYLOAD = {
    seconds: number
}

const currentIdleSeconds = ref(0);
const idleSecondsStore = ref(0);
const intervalRef = ref<NodeJS.Timer|null>(null);
const isIdle = computed(() => currentIdleSeconds.value >= IDLE_THRESHOLD_SECONDS);
const formattedIdle = computed(() => formatTime(idleSecondsStore.value * 1000, true))

export const useIdleState = () => {
    function startIdleCheck() {
        if (intervalRef.value) return; // idle check already running

        intervalRef.value = setInterval(() => {
            invoke('get_idle_time').then((data) => {
                const idleSeconds = data as number;
                currentIdleSeconds.value = idleSeconds
                if (idleSeconds > idleSecondsStore.value) {
                    idleSecondsStore.value = idleSeconds;
                }
            });
        }, IDLE_CHECK_INTERVAL);
    }

    function stopIdleCheck() {
        if(intervalRef.value){
            clearInterval(intervalRef.value);
            intervalRef.value = null;
        }
    }

    function reset() {
        currentIdleSeconds.value = 0;
        idleSecondsStore.value = 0;
    }

    return {startIdleCheck, stopIdleCheck, reset, isIdle, formattedIdle, idleSeconds: idleSecondsStore}
}
