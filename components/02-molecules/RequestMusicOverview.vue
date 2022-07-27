<template>
  <div class="flex max-w-sm md:max-w-none border p-3 rounded-md">
    <img
      :src="props.imageUrl"
      :alt="`${props.musicTitle} | ${props.artistName}`"
      width="50px"
    />
    <div class="w-full ml-2 overflow-hidden text-gray-100">
      <p class="text-lg truncate">
        {{ props.musicTitle }}
      </p>
      <p class="truncate">
        {{ props.artistName }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { MusicOverview } from '~/types/components/music_overview'

export default defineComponent({
  props: {
    props: { type: Object as PropType<MusicOverview>, required: true },
  },
  setup() {},
})
</script>
