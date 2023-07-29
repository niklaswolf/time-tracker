<script setup lang="ts">
import {window} from "@tauri-apps/api";
import type {IDLE_EVENT_PAYLOAD} from "~/composables/useIdleState";

const currentWindow = window.getCurrent();
const {startIdleCheck, isIdle, formattedIdle, stopIdleCheck, reset, idleSeconds} = useIdleState();
const {listen, emit} = useEvent();

async function handleDismiss() {
  await emit(EVENT_IDLE_DISMISS, {seconds: idleSeconds.value} as IDLE_EVENT_PAYLOAD)
  reset()
  currentWindow.hide();
  startIdleCheck();
}

async function handleKeep() {
  await emit(EVENT_IDLE_KEEP, {seconds: idleSeconds.value} as IDLE_EVENT_PAYLOAD)
  reset()
  currentWindow.hide();
  startIdleCheck();
}

listen(EVENT_TIMER_START, startIdleCheck)
listen(EVENT_TIMER_STOP, stopIdleCheck)

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
