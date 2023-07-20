<script setup lang="ts">
import {register} from '@tauri-apps/api/globalShortcut';
import {appWindow} from "@tauri-apps/api/window";
import {emit, listen} from "@tauri-apps/api/event";

const {isRunning, isPaused, startTimer, stopTimer, resumeTimer} = useTimer()

if (appWindow.label === 'main') {
  await register(GLOBAL_SHORTCUT, () => {
    emit('timer-change-event')
  });
} else if (appWindow.label === 'menubar') {
  listen('timer-change-event', () => {
    if (isRunning.value) {
      stopTimer();
    } else {
      if (isPaused.value) {
        resumeTimer();
      } else {
        try {
          startTimer()
        } catch (e){
          console.error(e)
          appWindow.show();
          appWindow.setFocus();
        }

      }
    }
  })
}

</script>
<template>
  <MenuBar v-if="appWindow.label === 'menubar'" class="menubar grow"/>
  <IdleNotification v-else-if="appWindow.label === 'idle-notification'" class="idle-notification grow"/>
  <MainWindow v-else class="main"></MainWindow>
</template>
