import { IUpdateRoomModel } from '~/core/01-models/updateRoom'
import { IUpdateRoomParams } from '~/types/params/updateRoom'
import { $axios } from '~/utils/api'

export interface IUpdateRoomRepository {
  put(params: IUpdateRoomParams): Promise<IUpdateRoomModel>
}

export class UpdateRoomRepository implements IUpdateRoomRepository {
  async put(params: IUpdateRoomParams): Promise<IUpdateRoomModel> {
    const roomId = params.roomId
    const result = await $axios
      .$post(`/mc/room/${roomId}`, {
        ...params,
        convert: true,
      })
      .then((res: IUpdateRoomModel) => {
        return res
      })
    return result
  }
}
