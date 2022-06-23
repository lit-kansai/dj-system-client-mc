import { ref } from '@nuxtjs/composition-api'
import { IMusicModel, MusicModel } from '~/core/01-models/music'

export const ModalState = ['musicSelect', 'confirm', 'finished'] as const
export const useModal = () => {
  const currentState = ref<typeof ModalState[number]>('musicSelect')
  const nextModal = () => {
    switch (currentState.value) {
      case 'musicSelect':
        currentState.value = 'confirm'
        break
      case 'confirm':
        currentState.value = 'finished'
        break
      case 'finished':
        currentState.value = 'musicSelect'
        break
    }
  }
  const previousModal = () => {
    switch (currentState.value) {
      case 'musicSelect':
        break
      case 'confirm':
        currentState.value = 'musicSelect'
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
      artists: [{ id: '', name: '' }],
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
