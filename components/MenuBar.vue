<script lang="ts" setup>
import {appWindow, WebviewWindow, getAll} from "@tauri-apps/api/window";
const {startTimer, stopTimer, resumeTimer, pauseTimer, isRunning, isPaused} = useTimer();

function handleOpenMain(){
  const mainWindow = getAll().find(window => window.label === 'main');
  mainWindow?.show();
}

</script>

<template>
  <div class="arrow">
    <div class="menu-bar">
      <template v-if="!isRunning">
        <button @click="startTimer()" >Start Timer</button>
        <button v-if="isPaused" @click="resumeTimer()">Resume Timer</button>
      </template>
      <template v-else>
        <button @click="pauseTimer()" >Pause Timer</button>
        <button @click="stopTimer()">Stop Timer</button>
      </template>
      <button @click="handleOpenMain">Open main</button>
    </div>
  </div>
</template>

<style scoped>


.menu-bar {
  background: var(--bg-color);
  flex: 1;
  border-radius: 4px;
  padding: .5em;
  color: var(--color);
  border: 1px solid var(--bg-border-color);
}
.arrow {
  position: relative;
  padding: 12px 0 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 12px);
}

.arrow:before {
  content: '';
  height: 0;
  width: 0;
  border-width: 0 8px 12px 8px;
  border-style: solid;
  border-color: transparent transparent var(--bg-border-color) transparent;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
