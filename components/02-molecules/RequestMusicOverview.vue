<template>
  <div
    class="flex p-3 border rounded-md border-neon-green shadow-card-neon-green"
  >
    <img
      :src="props.imageUrl"
      :alt="`${props.musicTitle} | ${props.artistName}`"
      width="50px"
    />
    <div class="w-full ml-2 overflow-hidden text-gray-100">
      <p class="text-lg truncate">
        {{ props.musicTitle }}
      </p>
      <p class="pl-1 truncate">
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
