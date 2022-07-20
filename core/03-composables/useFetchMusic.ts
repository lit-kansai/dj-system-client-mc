import { Ref, ref } from '@vue/composition-api'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchMusicRepository } from '~/core/02-repositories/fetchMusic'
import { IFetchMusicParams } from '~/types/params/fetchMusicParams'

export const useFetchMusic = (repository: IFetchMusicRepository) => {
  const musics: Ref<IMusicModel[]> = ref([])
  const fetchMusic = (params: IFetchMusicParams) => {
    repository.fetch(params).then((response: IMusicModel[]) => {
      if (musics.value.length) {
        musics.value = []
      }
      response.map((music) => musics.value.push(music))
    })
  }

  return {
    musics,
    fetchMusic,
  }
}
