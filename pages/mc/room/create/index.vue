<template>
  <div>
    <h1>mc/room/create</h1>
    <p>{{ id }}</p>
    <NuxtLink to="/top">top</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { computed, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const route = useRoute()
    const id = computed(() => route.value.params.id)
    return { id }
  },
})
</script>
