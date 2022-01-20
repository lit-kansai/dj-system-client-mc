<template>
  <p class="text-4xl text-neon-pink drop-shadow-neon-pink">{{ text }}</p>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface HeaderText {
  text: string
}

export default defineComponent({
  props: {
    text: { type: String, required: true },
  },
  setup() {},
})
</script>
