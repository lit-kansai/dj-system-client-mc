import { Ref, ref, readonly } from '@vue/composition-api'
import { AxiosError } from 'axios'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchMusicsRepository } from '~/core/02-repositories/fetchMusics'
import { IFetchMusicsParams } from '~/types/params/fetchMusicsParams'
import { useLoading } from '~/core/03-composables/useLoading'

export const useFetchMusics = (repository: IFetchMusicsRepository) => {
  const { loading: fetchMusicsLoading, setLoading } = useLoading()
  const musics: Ref<IMusicModel[] | undefined> = ref(undefined)
  const fetchMusicsError: Ref<AxiosError | Error | undefined> = ref(undefined)
  const fetchMusics = (params: IFetchMusicsParams) => {
    setLoading(true)
    repository
      .fetch(params)
      .then((response: IMusicModel[]) => {
        setLoading(false)
        musics.value = response
      })
      .catch((error) => {
        setLoading(false)
        fetchMusicsError.value = error
      })
  }

  return {
    musics: readonly(musics),
    fetchMusicsLoading: readonly(fetchMusicsLoading),
    fetchMusicsError: readonly(fetchMusicsError),
    fetchMusics,
  }
}
