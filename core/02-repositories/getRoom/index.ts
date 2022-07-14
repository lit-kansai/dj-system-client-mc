import { IGetRoomModel } from '~/core/01-models/getRoom'
import { IGetRoomParams } from '~/types/params/getRoom'
import { $axios } from '~/utils/api'

export interface IGetRoomRepository {
  get(params: IGetRoomParams): Promise<IGetRoomModel>
}

export class GetRoomRepository implements IGetRoomRepository {
  async get(params: IGetRoomParams): Promise<IGetRoomModel> {
    const displayId = params.displayId
    const result = await $axios
      .$get(`/room/${displayId}`, { params })
      .then((res: IGetRoomModel) => {
        return res
      })
    return result
  }
}
