<template>
  <div class="h-32">
    <div class="flex items-center py-3 px-5">
      <div class="flex items-center flex-grow">
        <Logo />
        <p class="text-4xl pl-1">
          {{ title }}
        </p>
      </div>
      <slot name="right"></slot>
    </div>
    <div class="mb-4 border-b-2 border-neon-pink shadow-neon-pink"></div>
    <div class="border-b-2 border-neon-blue shadow-neon-blue"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface Header {
  title: string
}

export default defineComponent({
  props: {
    title: { type: String, required: true },
  },
  setup() {},
})
</script>
