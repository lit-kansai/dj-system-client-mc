import { ref } from '@nuxtjs/composition-api'

export const ModalState = ['confirm', 'finished'] as const
export const useRequestMusicModalState = () => {
  const currentModal = ref<typeof ModalState[number]>('confirm')
  const nextModal = () => {
    switch (currentModal.value) {
      case 'confirm':
        currentModal.value = 'finished'
        break
      case 'finished':
        currentModal.value = 'confirm'
        break
    }
  }
  const previousModal = () => {
    switch (currentModal.value) {
      case 'confirm':
        break
      case 'finished':
        currentModal.value = 'confirm'
        break
    }
  }

  return { currentModal, nextModal, previousModal }
}
