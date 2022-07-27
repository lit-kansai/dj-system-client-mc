<template>
  <button
    class="flex p-2 text-gray-200 bg-gray-800 border-2 rounded-full opacity-100 border-blue shadow-close-button-neon-blue hover:opacity-60"
  >
    <svg
      class="w-6 h-6 fill"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
