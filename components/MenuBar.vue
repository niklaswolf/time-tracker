<script lang="ts" setup>
import {getAll} from "@tauri-apps/api/window";

const {startTimer, stopTimer, resumeTimer, pauseTimer, isRunning, isPaused, formatted} = useTimer();
const {currentTaskId, taskLabel, taskId} = useTask()

const showTimer = ref(!!currentTaskId.value);
const searchString = ref('');
const searchboxRef = ref();

function handleOpenMain() {
  const mainWindow = getAll().find(window => window.label === 'main');
  mainWindow?.show();
}

function handleSearchEnter(event: KeyboardEvent) {
  // TODO: change this to use the correct task id, not the search string directly
  currentTaskId.value = searchString.value
  showTimer.value = true;
}

function handleSwitch(){
  if(currentTaskId.value){
    showTimer.value = !showTimer.value;
  } else {
    showTimer.value = false
  }

}

watch(showTimer, () => {
  if(!showTimer.value){
    searchboxRef.value.focus()
  }
}, {flush: "post"})

</script>

<template>
  <div
      class="arrow font-sans text-xs before:border-solid before:border-transparent before:border-b-light-100 @dark:before:border-b-dark-800">
    <div
        class="bg-light-800 @dark:bg-dark-600 text-neutral-800 @dark:text-neutral-300 flex flex-col grow border-rd relative">
      <div class="p-2 flex justify-between">
        <a href="#" class="flex items-center text-neutral-800 @dark:text-neutral-300 no-underline hover:underline">
          <div class="i-mdi-note text-xl @dark:text-neutral-400"></div>
          <div class="ml-2 ">{{taskId}} - {{taskLabel}}</div>
        </a>
        <button @click="handleSwitch" class="rounded-full border-none bg-transparent cursor-pointer flex items-center">
          <span class="i-mdi-swap-horizontal @dark:text-neutral-400 text-lg" ></span>
        </button>
      </div>
      <div class="grow flex items-center bg-light-100 @dark:bg-dark-400 p-2">
        <template v-if="showTimer">
          <div class="text-base mr-2">{{ formatted }}</div>
          <template v-if="!isRunning">
            <button v-if="isPaused" @click="resumeTimer"
                    class="rounded-full border-none bg-neutral-300 @dark:bg-neutral-400 cursor-pointer flex items-center">
              <span class="i-mdi-play-pause"></span>
              <span>Resume</span>
            </button>
            <button v-else @click="startTimer"
                    class="rounded-full border-none bg-neutral-300 @dark:bg-neutral-400 cursor-pointer flex items-center">
              <span class="i-mdi-play"></span>
              <span>Start</span>
            </button>
          </template>
          <template v-else>
            <button @click="pauseTimer"
                    class="rounded-full border-none bg-neutral-300 @dark:bg-neutral-400 cursor-pointer flex items-center">
              <span class="i-mdi-pause"></span>
              <span>Pause</span>
            </button>
            <button @click="stopTimer()"
                    class="rounded-full border-none bg-neutral-300 @dark:bg-neutral-400 cursor-pointer flex items-center">
              <span class="i-mdi-stop"></span>
              <span>Stop</span>
            </button>
          </template>
        </template>
        <template v-else>
          <input type="text" ref="searchboxRef" v-model="searchString" @keyup.enter="handleSearchEnter" placeholder="Press enter to confirm">
        </template>
      </div>

      <button @click="handleOpenMain"
              class="absolute bottom-0 right-0 rounded-full border-none bg-transparent cursor-pointer flex items-center">
        <i class="i-mdi-expand-all @dark:text-neutral-400 text-xl"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
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
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
