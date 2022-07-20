import { ref, Ref } from '@nuxtjs/composition-api'

export interface IModal {
  opened: boolean
}

export const useModal = () => {
  const modalState: Ref<IModal> = ref<IModal>({
    opened: false,
  })

  const openModal = () => {
    modalState.value.opened = true
  }

  const closeModal = () => {
    modalState.value.opened = false
  }

  return {
    modalState,
    openModal,
    closeModal,
  }
}
