<template>
  <button
    class="p-3 cursor-pointer border rounded-md bg-yellow"
  >
    <div v-if="type == 'text'">
      <p class="text-2xl">{{ text }}</p>
    </div>
    <div v-else-if="type == 'search'" width="180px" height="80px">
      <img src="~assets/img/search.svg" class="w-20 h-6" />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface Card {
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
