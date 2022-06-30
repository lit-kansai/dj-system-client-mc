<template>
  <div
    class="max-w-[200px] cursor-pointer relative border border-neon-green shadow-card-neon-green rounded-md"
  >
    <div
      class="absolute flex items-center justify-center w-full h-full bg-gray-800 opacity-0 hover:opacity-80 transition-opacity rounded-md"
    >
      <p class="text-9xl font-extralight">+</p>
    </div>
    <img
      class="rounded-md"
      :src="imageUrl"
      :alt="`${musicTitle} | ${artistName}`"
    />
    <div class="p-3">
      <p class="truncate">{{ musicTitle }}</p>
      <p class="text-gray-300 truncate">{{ artistName }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface Card {
  musicTitle: string
  artistName: string
  imageUrl: string
}

export default defineComponent({
  props: {
    musicTitle: { type: String, required: true },
    artistName: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  setup() {},
})
</script>
