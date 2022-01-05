<template>
  <div>
    <h1>mc/room/_displayID</h1>
    <p>{{ displayID }}</p>
    <NuxtLink to="/top">top</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const { displayID } = $nuxt.$route.params
    return { displayID }
  },
})
</script>
