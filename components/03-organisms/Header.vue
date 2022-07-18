<template>
  <div class="w-full max-w-sm m-auto md:max-w-7xl">
    <div class="flex items-center justify-between py-4 md:py-6">
      <div class="flex">
        <logo />
        <p class="ml-2 text-2xl">
          {{ title }}
        </p>
      </div>
      <slot name="right"></slot>
    </div>
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
