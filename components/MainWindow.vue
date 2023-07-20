<script setup lang="ts">
const {entries, clearEntries} = useStore()

</script>

<template>
  <div>
    <h1>Tracked entries:</h1>
    <button @click="clearEntries" class="rounded-full border-none bg-neutral-300 @dark:bg-neutral-400 cursor-pointer flex items-center">
      <span class="i-mdi-delete"></span><span>clear</span>
    </button>
    <ul>
      <li v-for="entry of entries">
        {{entry.taskId}}: {{formatTime(entry.endTime - entry.startTime, true)}} ({{entry.startTime.toLocaleString(undefined, {timeStyle: 'medium', dateStyle: 'short'})}} - {{entry.endTime.toLocaleString(undefined, {timeStyle: 'medium', dateStyle: 'short'})}})
      </li>
    </ul>
  </div>
</template>
