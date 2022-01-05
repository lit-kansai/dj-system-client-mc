<template>
  <div>
    <h1>/room/_id</h1>
    <p>{{ id }}</p>
    <NuxtLink to="/top">top</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const id = $nuxt.$route.params.id
    return { id }
  },
})
</script>
