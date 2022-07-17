import { Ref, ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IRoomModel } from '~/core/01-models/room'
import { IFetchRoomsRepository } from '~/core/02-repositories/fetchRooms'

export const useFetchRooms = (repository: IFetchRoomsRepository) => {
  const fetchRoomsResponse: Ref<IRoomModel[]> = ref([])
  const fetchRoomsError: Ref<AxiosError | Error | undefined> = ref(undefined)

  const fetchRooms = () => {
    repository
      .get()
      .then((rooms) => {
        rooms.map((room) => fetchRoomsResponse.value.push(room))
      })
      .catch((error: AxiosError) => {
        fetchRoomsError.value = error
      })
  }

  return {
    fetchRoomsResponse,
    fetchRoomsError,
    fetchRooms,
  }
}
