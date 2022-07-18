import { ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IFetchRoomDetailModel } from '../01-models/fetchRoomDetail'
import { IFetchRoomDetailRepository } from '../02-repositories/fetchRoomDetail'
import { IFetchRoomDetailParams } from '~/types/params/fetchRoomDetail'

export const useFetchRoomDetail = (repository: IFetchRoomDetailRepository) => {
  const fetchRoomResponse = ref<undefined | IFetchRoomDetailModel>(undefined)
  const fetchRoomError = ref<undefined | AxiosError>(undefined)
  const fetchRoom = (params: IFetchRoomDetailParams): void => {
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
