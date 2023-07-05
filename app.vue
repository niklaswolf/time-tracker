<script setup lang="ts">
import { invoke } from '@tauri-apps/api'

// now we can call our Command!
// Right-click the application background and open the developer tools.
// You will see "Hello, World!" printed in the console!
invoke('greet', { name: 'World' })
    // `invoke` returns a Promise
    .then((response) => console.log(response))
</script>
<template>
  <MenuBar />
</template>
