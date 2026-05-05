<script setup lang="ts">
const emit = defineEmits<{
  (e: 'submit', credentials: Credentials): void
}>()

const credentials = reactive<Credentials>({
  username: useRuntimeConfig().public.jiraUser ?? '',
  password: useRuntimeConfig().public.jiraPassword ?? ''
})

function handleSubmit(){
  emit('submit', toRaw(credentials))
}
</script>

<template>
  <form @submit="handleSubmit">
    <div>
      <label for="user-input">User</label>
      <input id="user-input" type="text" v-model="credentials.username"/>
    </div>
    <div>
      <label for="password-input">Password</label>
      <input id="password-input" type="password" v-model="credentials.password"/>
    </div>

    <button type="submit">Login</button>
  </form>

</template>
