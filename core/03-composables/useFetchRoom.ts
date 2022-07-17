import { ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IFetchRoomModel } from '../01-models/fetchRoom'
import { IFetchRoomRepository } from '../02-repositories/fetchRoom'
import { IFetchRoomParams } from '~/types/params/fetchRoom'

export const useFetchRoom = (repository: IFetchRoomRepository) => {
  const fetchRoomResponse = ref<undefined | IFetchRoomModel>(undefined)
  const fetchRoomError = ref<undefined | AxiosError>(undefined)
  const fetchRoom = (params: IFetchRoomParams): void => {
    repository
      .get(params)
      .then((res) => (fetchRoomResponse.value = res))
      .catch((err: AxiosError) => {
        fetchRoomError.value = err
      })
  }

  return {
    fetchRoomResponse,
    fetchRoomError,
    fetchRoom,
  }
}
