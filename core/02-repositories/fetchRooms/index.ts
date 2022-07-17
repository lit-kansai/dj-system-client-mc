import { IRoomModel } from '~/core/01-models/room'
import { $axios } from '~/utils/api'

export interface IFetchRoomsRepository {
  get(): Promise<IRoomModel[]>
}

export class FetchRoomsRepository implements IFetchRoomsRepository {
  async get(): Promise<IRoomModel[]> {
    const result = await $axios.$get<IRoomModel[]>('/mc/room')
    return result
  }
}
