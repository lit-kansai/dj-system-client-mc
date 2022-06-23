import { Ref, ref } from '@vue/composition-api'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchMusicRepository } from '~/core/02-repositories/fetchMusic'

export const useFetchMusic = (repository: IFetchMusicRepository) => {
  const musics: Ref<IMusicModel[]> = ref([])
  const fetchMusic = () => {
    repository
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
