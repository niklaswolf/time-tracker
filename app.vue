<script setup lang="ts">
import { register } from '@tauri-apps/api/globalShortcut';

const {startTimer, isRunning, stopTimer} = useTimer();

await register(GLOBAL_SHORTCUT, () => {
  if(isRunning.value){
    stopTimer();
  }
  else {
    startTimer()
  }
});
</script>
<template>
  <MenuBar />
</template>
