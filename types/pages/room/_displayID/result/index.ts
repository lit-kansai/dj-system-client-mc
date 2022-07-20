import { ref } from '@nuxtjs/composition-api'
import { IMusicModel, MusicModel } from '~/core/01-models/music'

export const ModalState = ['confirm', 'finished'] as const
export const useModalState = () => {
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

export const useSelectedMusic = () => {
  const selectedMusic = ref<IMusicModel>(
    new MusicModel({
      id: '',
      artists: '',
      album: { name: '', jacketUrl: '' },
      name: '',
      duration: 0,
    })
  )

  const setSelectedMusic = (music: IMusicModel) => {
    selectedMusic.value = music
  }
  return { selectedMusic, setSelectedMusic }
}

export type State = {
  selectedMusic: IMusicModel
}
