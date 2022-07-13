import { ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IGetRoomModel } from '../01-models/getRoom'
import { IGetRoomRepository } from '../02-repositories/getRoom'
import { IGetRoomParams } from '~/types/params/getRoom'

export const useGetRoom = (repository: IGetRoomRepository) => {
  const getRoomResponse = ref<undefined | IGetRoomModel>(undefined)
  const getRoomError = ref<undefined | AxiosError>(undefined)
  const getRoom = (params: IGetRoomParams): void => {
    repository
      .get(params)
      .then((res) => (getRoomResponse.value = res))
      .catch((err: AxiosError) => {
        getRoomError.value = err
      })
  }

  return {
    getRoomResponse,
    getRoomError,
    getRoom,
  }
}
