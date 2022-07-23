import { ref } from '@nuxtjs/composition-api'

export const ModalState = ['confirm', 'finished'] as const
export const useRequestMusicModalState = () => {
  const currentState = ref<typeof ModalState[number]>('confirm')
  const nextModal = () => {
    switch (currentState.value) {
      case 'confirm':
        currentState.value = 'finished'
        break
      case 'finished':
        currentState.value = 'confirm'
        break
    }
  }
  const previousModal = () => {
    switch (currentState.value) {
      case 'confirm':
        break
      case 'finished':
        currentState.value = 'confirm'
        break
    }
  }

  return { currentState, nextModal, previousModal }
}
