import { ref, Ref, readonly } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { useLoading } from '~/core/03-composables/useLoading'
import { IRequestMusicRepository } from '~/core/02-repositories/requestMusic'
import { IRequestMusicParams } from '~/types/params/requestMusic'
import { useRequestTimer } from '~/core/03-composables/useRequestTimer'
import { $nuxt } from '~/utils/nuxtInstance'

export interface UseRequestMusicInputs {
  params: IRequestMusicParams
  roomId: string
}

export const useRequestMusic = (repository: IRequestMusicRepository) => {
  const { loading: requestMusicLoading, setLoading } = useLoading()
  const requestMusicResult: Ref<{ ok: boolean } | undefined> = ref(undefined)
  const requestMusicError: Ref<AxiosError | Error | undefined> = ref(undefined)
  const { saveRequestedTime } = useRequestTimer()

  const requestMusic = (inputs: UseRequestMusicInputs) => {
    setLoading(true)
    repository
      .post(inputs)
      .then((result) => {
        setLoading(false)
        requestMusicResult.value = result
        saveRequestedTime()
        const { redirect } = $nuxt
        setTimeout(() => {
          redirect(`/room/${inputs.roomId}`)
        }, 3 * 1000)
      })
      .catch((error) => {
        setLoading(false)
        requestMusicError.value = error
      })
  }

  return {
    requestMusicLoading: readonly(requestMusicLoading),
    requestMusicResult: readonly(requestMusicResult),
    requestMusicError: readonly(requestMusicError),
    requestMusic,
  }
}
