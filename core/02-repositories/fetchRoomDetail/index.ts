import { IFetchRoomDetailModel } from '~/core/01-models/fetchRoomDetail'
import { IFetchRoomDetailParams } from '~/types/params/fetchRoomDetail'
import { $axios } from '~/utils/api'

export interface IFetchRoomDetailRepository {
  get(params: IFetchRoomDetailParams): Promise<IFetchRoomDetailModel>
}

export class FetchRoomDetailRepository implements IFetchRoomDetailRepository {
  async get(params: IFetchRoomDetailParams): Promise<IFetchRoomDetailModel> {
    const roomId = params.roomId
    const result = await $axios
      .$get(`/mc/room/${roomId}`)
      .then((res: IFetchRoomDetailModel) => {
        return res
      })
    return result
  }
}
