import { ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IGetRoomModel } from '../01-models/getRoom'
import { IGetRoomRepository } from '../02-repositories/getRoom'
import { IGetRoomParams } from '~/types/params/getRoom'

export const useGetRoom = (repository: IGetRoomRepository) => {
  const response = ref<undefined | IGetRoomModel>(undefined)
  const error = ref<undefined | AxiosError>(undefined)
  const getRoom = (params: IGetRoomParams): void => {
    repository
      .get(params)
      .then((res) => (response.value = res))
      .catch((err: AxiosError) => {
        error.value = err
      })
  }

  return {
    response,
    error,
    getRoom,
  }
}
