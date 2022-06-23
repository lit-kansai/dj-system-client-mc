<template><div></div></template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface RequestMusicDetail {
  musicTitle: string
  artistName: string
  imageUrl: string
  providerUrl: String
  time: number
}

export default defineComponent({
  setup() {},
})
</script>
