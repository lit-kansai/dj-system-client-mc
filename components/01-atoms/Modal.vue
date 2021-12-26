<!-- TODO: Modalのネオンを少し弱める -->
<template>
  <div
    v-if="opened"
    class="fixed z-50 flex items-center justify-center w-screen h-screen"
  >
    <div
      class="relative p-5 border-2 border-neon-blue shadow-modal-neon-blue rounded-2xl"
    >
      <ModalCloseButton
        class="absolute top-0 right-0 origin-center translate-x-1/2 -translate-y-1/2"
        @click.native="close()"
      />
      <div class="border-2 border-neon-pink shadow-modal-neon-pink rounded-2xl">
        <div class="bg-gray-800 rounded-2xl">
          <slot name="content"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface Modal {
  opened: boolean
}

export default defineComponent({
  props: {
    opened: { type: Boolean, required: true },
  },
  emits: ['close'],
  setup(_, { emit }) {
    const close = (): void => {
      emit('close')
    }
    return { close }
  },
})
</script>
