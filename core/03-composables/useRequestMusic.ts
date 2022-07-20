import { ref, Ref } from '@nuxtjs/composition-api'
import { IRequestMusicRepository } from '~/core/02-repositories/requestMusic'
import { RequestMusicParams } from '~/types/params/requestMusic'

export interface UseRequestMusicInputs {
  params: RequestMusicParams
  roomId: string
}

export const useRequestMusic = (repository: IRequestMusicRepository) => {
  const requestMusicResult: Ref<string | undefined> = ref(undefined)
  const requestMusic = (inputs: UseRequestMusicInputs) => {
    repository.post(inputs).then((result) => {
      requestMusicResult.value = result
    })
  }

  return { requestMusicResult, requestMusic }
}
