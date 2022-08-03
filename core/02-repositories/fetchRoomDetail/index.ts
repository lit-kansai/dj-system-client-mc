import {
  IRoomDetailEntity,
  IRoomDetailModel,
  RoomDetailModel,
} from '~/core/01-models/roomDetail'
import { IFetchRoomDetailParams } from '~/types/params/fetchRoomDetail'
import { $axios } from '~/utils/api'

export interface IFetchRoomDetailRepository {
  get(params: IFetchRoomDetailParams): Promise<IRoomDetailModel>
}

export class FetchRoomDetailRepository implements IFetchRoomDetailRepository {
  async get(params: IFetchRoomDetailParams): Promise<IRoomDetailModel> {
    const roomId = params.roomId
    const result = await $axios
      .$get(`/mc/room/${roomId}`)
      .then((res: IRoomDetailEntity) => {
        return new RoomDetailModel(res)
      })
    return result
  }
}
