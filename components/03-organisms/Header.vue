<template>
  <div class="w-full m-auto">
    <div class="flex items-center justify-between py-4 md:py-6">
      <NuxtLink :to="redirectUrl">
        <div class="flex">
          <logo />
          <p class="ml-2 text-2xl">
            {{ title }}
          </p>
        </div>
      </NuxtLink>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface Header {
  title: string
  redirectUrl: string
}

export default defineComponent({
  props: {
    title: { type: String, required: true },
    redirectUrl: { type: String, default: '' },
  },
  setup() {},
})
</script>
