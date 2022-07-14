import { ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IUpdateRoomModel } from '../01-models/updateRoom'
import { IUpdateRoomRepository } from '../02-repositories/updateRoom'
import { IUpdateRoomParams } from '~/types/params/updateRoom'

export const useUpdateRoom = (repository: IUpdateRoomRepository) => {
  const updateRoomResponse = ref<undefined | IUpdateRoomModel>(undefined)
  const updateRoomError = ref<undefined | AxiosError>(undefined)
  const updateRoom = (params: IUpdateRoomParams): void => {
    repository
      .put(params)
      .then((res) => (updateRoomResponse.value = res))
      .catch((err: AxiosError) => {
        updateRoomError.value = err
      })
  }

  return {
    updateRoomResponse,
    updateRoomError,
    updateRoom,
  }
}
