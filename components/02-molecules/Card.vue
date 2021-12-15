<template>
  <div
    class="max-w-[200px] cursor-pointer relative border border-neon-green shadow-card-neon-green rounded-md"
  >
    <div
      class="hover:opacity-80 opacity-0 transition-opacity absolute h-full w-full rounded-md bg-gray-800 flex justify-center items-center"
    >
      <p class="text-9xl font-extralight">+</p>
    </div>
    <img
      class="rounded-md"
      :src="imageUrl"
      :alt="`${musicTitle} | ${artistName}`"
    />
    <div class="p-3 text-gray-100">
      <p class="text-xl truncate">{{ musicTitle }}</p>
      <p class="mt-1 text-base truncate">{{ artistName }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

export interface Card {
  musicTitle: string
  artistName: string
  imageUrl: string
}

export default defineComponent({
  props: {
    card: { type: Object as PropType<Card>, required: true },
  },
  setup(props) {
    const musicTitle = computed((): string => props.card.musicTitle)
    const artistName = computed((): string => props.card.artistName)
    const imageUrl = computed((): string => props.card.imageUrl)
    return {
      musicTitle,
      artistName,
      imageUrl,
    }
  },
})
</script>
