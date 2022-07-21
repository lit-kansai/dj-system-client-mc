import { Ref, ref } from '@vue/composition-api'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchMusicsRepository } from '~/core/02-repositories/fetchMusics'
import { IFetchMusicsParams } from '~/types/params/fetchMusicsParams'

export const useFetchMusics = (repository: IFetchMusicsRepository) => {
  const musics: Ref<IMusicModel[]> = ref([])
  const fetchMusics = (params: IFetchMusicsParams) => {
    repository.fetch(params).then((response: IMusicModel[]) => {
      if (musics.value.length) {
        musics.value = []
      }
      response.map((music) => musics.value.push(music))
    })
  }

  return {
    musics,
    fetchMusics,
  }
}
