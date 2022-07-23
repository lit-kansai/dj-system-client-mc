import { ref } from '@nuxtjs/composition-api'
import { IMusicModel, MusicModel } from '~/core/01-models/music'

export type State = {
  selectedMusic: IMusicModel
}
export const useSelectedMusic = () => {
  const selectedMusic = ref<IMusicModel>(
    new MusicModel({
      id: '',
      artists: '',
      thumbnail: '',
      album: '',
      name: '',
      duration: 0,
    })
  )

  const setSelectedMusic = (music: IMusicModel) => {
    selectedMusic.value = music
  }
  return { selectedMusic, setSelectedMusic }
}
