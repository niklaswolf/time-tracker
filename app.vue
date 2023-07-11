<script setup lang="ts">
import { register } from '@tauri-apps/api/globalShortcut';
import { appWindow } from "@tauri-apps/api/window";

const {startTimer, isRunning, stopTimer} = useTimer();

if(appWindow.label === 'main'){
  await register(GLOBAL_SHORTCUT, () => {
    if(isRunning.value){
      stopTimer();
    }
    else {
      startTimer()
    }
  });
}

</script>
<template>
  <MenuBar v-if="appWindow.label === 'menubar'" class="menubar"/>
  <NuxtWelcome v-else class="main"></NuxtWelcome>
</template>
