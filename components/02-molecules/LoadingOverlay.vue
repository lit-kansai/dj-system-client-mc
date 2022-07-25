<template>
  <div
    class="fixed inset-0 z-10 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60"
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
