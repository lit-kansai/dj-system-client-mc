import { Ref, ref } from '@vue/composition-api'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchMusicsRepository } from '~/core/02-repositories/fetchMusics'
import { IFetchMusicsParams } from '~/types/params/fetchMusicsParams'

export const useFetchMusics = (repository: IFetchMusicsRepository) => {
  const musics: Ref<IMusicModel[] | undefined> = ref(undefined)
  const fetchMusics = (params: IFetchMusicsParams) => {
    repository.fetch(params).then((response: IMusicModel[]) => {
      musics.value = response
    })
  }

  return {
    musics,
    fetchMusics,
  }
}
