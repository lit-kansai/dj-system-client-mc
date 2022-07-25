<template>
  <div
    v-if="opened"
    class="overflow-y-auto fixed inset-0 py-10 z-20 bg-black bg-opacity-40 animate-fade-in-down transform"
    @click="close()"
  >
    <div class="mx-4 md:mx-auto max-w-screen-lg md:px-3">
      <Container class="relative h-auto">
        <template #content>
          <ModalCloseButton
            class="absolute top-2 right-2 md:top-0 md:right-2 transform origin-center translate-x-1/2 -translate-y-1/2"
            @click.native="close()"
          />
          <slot name="content" />
        </template>
      </Container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

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
