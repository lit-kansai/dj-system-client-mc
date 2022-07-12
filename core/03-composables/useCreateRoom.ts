import { ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { ICreateRoomModel } from '~/core/01-models/createRoom'
import { ICreateRoomRepository } from '~/core/02-repositories/createRoom'
import { ICreateRoomParams } from '~/types/params/createRoom'

export const useCreateRoom = (repository: ICreateRoomRepository) => {
  const response = ref<undefined | ICreateRoomModel>(undefined)
  const error = ref<undefined | AxiosError>(undefined)
  const createRoom = (params: ICreateRoomParams): void => {
    repository
      .post(params)
      .then((res) => (response.value = res))
      .catch((err: AxiosError) => {
        error.value = err
      })
  }

  return {
    response,
    error,
    createRoom,
  }
}
