<template>
  <div
    class="w-full h-full p-2.5 md:p-5 border-2 border-neon-blue shadow-modal-neon-blue rounded-2xl"
  >
    <div
      class="bg-gray-800 border-2 border-neon-pink shadow-modal-neon-pink rounded-2xl"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>
