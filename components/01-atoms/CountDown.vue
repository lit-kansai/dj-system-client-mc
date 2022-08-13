<template>
  <div class="max-w-max text-center text-neon-pink drop-shadow-neon-pink">
    <p class="text-7xl mb-1">{{ time }}</p>
    <p class="tracking-wide">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    time: { type: String, required: true },
    text: { type: String, required: true },
  },
  setup() {},
})
</script>
