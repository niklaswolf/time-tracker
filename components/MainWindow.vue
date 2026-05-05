<script setup lang="ts">
import {StorageSerializers} from "@vueuse/core";

const {entries, clearEntries} = useStore()
const credentials = useLocalStorage<Credentials|null>('credentials', null, { serializer: StorageSerializers.object });
const {$taskService} = useNuxtApp()

const loggedIn = computed(() => !!credentials.value);
const filters = ref<Filter[]>([]);
const currentFilter = ref<Filter|null>(null);

async function handleLogin(creds: Credentials){
  await $taskService.login(creds);
  credentials.value = creds;
  getFilters()
}

function handleFilterChange(newFilter: Filter){
  currentFilter.value = newFilter;
}

async function getFilters(){
  filters.value = await $taskService.fetchFilters();
}

onMounted(async () => {
  console.log(credentials.value);
  if(loggedIn.value && credentials.value){
    await $taskService.login(credentials.value)
    getFilters()
  }
})

</script>

<template>
  <LazyLoginForm v-if="!loggedIn" @submit="handleLogin"/>
  <div v-else>
    <h1>Filters</h1>
    <div>{{currentFilter?.name ?? 'no filter selected'}}</div>
    <LazyFilters :filters="filters" :current-filter="currentFilter" @change="handleFilterChange"/>
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
