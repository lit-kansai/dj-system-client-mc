<template>
  <div
    class="flex p-3 border rounded-md border-neon-green shadow-card-neon-green"
  >
    <img
      :src="imageUrl"
      :alt="`${musicTitle} | ${artistName}`"
      width="70px"
      height="70px"
    />
    <div class="ml-4 text-gray-100">
      <p class="text-3xl truncate">
        {{ musicTitle }}
      </p>
      <p class="text-2xl pl-1 truncate">
        {{ artistName }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface RequestMusicOverview {
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
