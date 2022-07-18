import { IFetchRoomModel } from '~/core/01-models/fetchRoom'
import { IFetchRoomParams } from '~/types/params/fetchRoom'
import { $axios } from '~/utils/api'

export interface IFetchRoomRepository {
  get(params: IFetchRoomParams): Promise<IFetchRoomModel>
}

export class FetchRoomRepository implements IFetchRoomRepository {
  async get(params: IFetchRoomParams): Promise<IFetchRoomModel> {
    const roomId = params.roomId
    const result = await $axios
      .$get(`/mc/room/${roomId}`)
      .then((res: IFetchRoomModel) => {
        return res
      })
    return result
  }
}
