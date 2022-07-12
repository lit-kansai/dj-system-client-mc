<template>
  <div
    class="absolute inset-x-0 top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-60"
  >
    <div class="flex items-center mb-20">
      <Loading />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {},
  setup() {},
})
</script>
