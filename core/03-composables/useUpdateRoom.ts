import { ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IUpdateRoomModel } from '../01-models/updateRoom'
import { IUpdateRoomRepository } from '../02-repositories/updateRoom'
import { IUpdateRoomParams } from '~/types/params/updateRoom'

export const useUpdateRoom = (repository: IUpdateRoomRepository) => {
  const response = ref<undefined | IUpdateRoomModel>(undefined)
  const error = ref<undefined | AxiosError>(undefined)
  const updateRoom = (params: IUpdateRoomParams): void => {
    repository
      .put(params)
      .then((res) => (response.value = res))
      .catch((err: AxiosError) => {
        error.value = err
      })
  }

  return {
    response,
    error,
    updateRoom,
  }
}
