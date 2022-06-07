<template>
  <Modal v-bind="modal" @close="closeModal">
    <template #content>
      <div class="w-[80vh] h-[50vh]"></div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Modal } from '~/components/01-atoms/Modal.vue'

export default defineComponent({
  setup() {
    const modal = ref<Modal>({
      opened: true,
    })
    return {
      modal,
    }
  },
})
</script>
