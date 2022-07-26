<template>
  <button
    class="p-3 cursor-pointer rounded-md bg-pink filter hover:bg-pink min-w-[60px] min-h-[60px]"
  >
    <div v-if="type == 'text'">
      <p class="text-2xl">{{ text }}</p>
    </div>
    <div v-else-if="type == 'search'" class="">
      <fa icon="search" class="text-2xl" />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface Button {
  text: string
  type: string
}

export default defineComponent({
  props: {
    type: { type: String, default: 'text' },
    text: { type: String, default: '送信' },
  },
  setup() {},
})
</script>
