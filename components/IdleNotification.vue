<script setup lang="ts">
import {invoke, window} from "@tauri-apps/api";

const currentIdleSeconds = ref(0);
const idleSecondsStore = ref(0);
const intervalRef = ref();
const isIdle = computed(() => currentIdleSeconds.value >= IDLE_THRESHOLD_SECONDS);
const formattedIdle = computed(() => formatTime(idleSecondsStore.value * 1000, true))
const currentWindow = window.getCurrent();

function handleDismiss() {
  //TODO affect the timer time
  idleSecondsStore.value = 0;
  currentWindow.hide();
  startIdleCheck();
}

function handleKeep() {
  idleSecondsStore.value = 0;
  //TODO affect the timer time
  currentWindow.hide();
  startIdleCheck();
}

function startIdleCheck() {
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
  clearInterval(intervalRef.value);
}

onMounted(() => {
  startIdleCheck();
})

watch(isIdle, (newIdleState, oldIdleState) => {
  if (newIdleState === true) {
    currentWindow.show();
    currentWindow.setFocus();
    currentWindow.setAlwaysOnTop(true)
  }
  if (newIdleState === false && oldIdleState === true) {
    // Re-engagement of user
    stopIdleCheck();
  }
})

</script>

<template>
  <div
      class="font-sans text-xs bg-light-100 @dark:bg-dark-400 p-2 text-neutral-800 @dark:text-neutral-3 flex flex-col items-center justify-center">
    <div class="text-xl">You've been idle for</div>
    <div class="text-xl mb-2">{{ formattedIdle }}</div>
    <div>First of all: are you ok? 🫣</div>
    <div>Second: choose one of the options below</div>
    <div class="mt-4 flex gap-x-4">
      <button class="rounded-full border-none bg-neutral-300 @dark:bg-neutral-400 cursor-pointer p-3 text-lg"
              @click="handleKeep">Keep time
      </button>
      <button class="rounded-full border-none bg-neutral-300 @dark:bg-neutral-400 cursor-pointer p-3 text-lg"
              @click="handleDismiss">Dismiss time
      </button>
    </div>
  </div>
</template>
