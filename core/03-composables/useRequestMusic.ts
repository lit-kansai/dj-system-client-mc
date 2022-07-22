import { ref, Ref, watch, readonly } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { useLoading } from '~/core/03-composables/useLoading'
import { IRequestMusicRepository } from '~/core/02-repositories/requestMusic'
import { RequestMusicParams } from '~/types/params/requestMusic'

export interface UseRequestMusicInputs {
  params: RequestMusicParams
  roomId: string
}

export const useRequestMusic = (repository: IRequestMusicRepository) => {
  const { loading: requestMusicLoading, setLoading } = useLoading()
  const requestMusicResult: Ref<boolean | undefined> = ref(undefined)
  const requestMusicError: Ref<AxiosError | Error | undefined> = ref(undefined)

  const requestMusic = (inputs: UseRequestMusicInputs) => {
    setLoading(true)
    repository
      .post(inputs)
      .then((result) => {
        requestMusicResult.value = result.ok
      })
      .catch((error) => {
        requestMusicError.value = error
      })
  }

  watch(requestMusicResult, () => {
    setLoading(false)
  })

  watch(requestMusicError, () => {
    setLoading(false)
  })

  return {
    requestMusicLoading: readonly(requestMusicLoading),
    requestMusicResult: readonly(requestMusicResult),
    requestMusicError: readonly(requestMusicError),
    requestMusic,
  }
}
