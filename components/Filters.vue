<script setup lang="ts">

const props = defineProps<{
  currentFilter: Filter|null,
  filters: Filter[]
}>()
const emit = defineEmits<{
  (e: 'change', filter: Filter): void
}>()

const currentFilter = computed({
  get() {
    return props.currentFilter?.id
  },
  set(newValue) {
    const newFilter = props.filters.find(f => f.id === newValue);
    newFilter && emit('change', newFilter)
  }
})

</script>

<template>
  <select v-model="currentFilter">
    <option disabled selected>Choose filter</option>
    <option v-for="filter of filters" :key="filter.id" :value="filter.id">
      {{ filter.name }}
    </option>
  </select>
</template>
