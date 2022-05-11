import { Ref, ref } from '@vue/composition-api'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchMusicRepository } from '~/core/02-repositories/fetchMusic'

export const useFetchMusic = (gateway: IFetchMusicRepository) => {
  const musics: Ref<IMusicModel[]> = ref([])
  const fetchMusic = () => {
    gateway
      .fetch()
      .then((response: IMusicModel[]) =>
        response.map((music) => musics.value.push(music))
      )
  }

  return {
    musics,
    fetchMusic,
  }
}
