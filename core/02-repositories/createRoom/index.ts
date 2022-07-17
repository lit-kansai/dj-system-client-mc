import { ICreateRoomModel } from '~/core/01-models/createRoom'
import { ICreateRoomParams } from '~/types/params/createRoom'
import { $axios } from '~/utils/api'

export interface ICreateRoomRepository {
  post(params: ICreateRoomParams): Promise<ICreateRoomModel>
}

export class CreateRoomRepository implements ICreateRoomRepository {
  async post(params: ICreateRoomParams): Promise<ICreateRoomModel> {
    const result = await $axios.$post<ICreateRoomModel>('/mc/room', {
      ...params,
      convert: true,
    })
    return result
  }
}
