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
      :src="props.imageUrl"
      :alt="`${props.musicTitle} | ${props.artistName}`"
    />
    <div class="p-3">
      <p class="truncate">{{ props.musicTitle }}</p>
      <p class="text-gray-300 truncate">{{ props.artistName }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { MusicOverview } from '~/types/components/music_overview'

export default defineComponent({
  props: {
    props: { type: Object as PropType<MusicOverview>, required: true },
  },
  setup() {},
})
</script>
