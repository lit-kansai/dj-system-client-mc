import { IRoomOverviewModel } from '~/core/01-models/roomOverview'
import { IFetchRoomOverviewParams } from '~/types/params/roomOverviewParams'
import { $axios } from '~/utils/api'

export interface IFetchRoomOverviewRepository {
  fetch(params: IFetchRoomOverviewParams): Promise<IRoomOverviewModel>
}

export class FetchRoomOverviewRepository
  implements IFetchRoomOverviewRepository
{
  fetch(params: IFetchRoomOverviewParams): Promise<IRoomOverviewModel> {
    const result = $axios.$get<IRoomOverviewModel>(`/room/${params.roomId}`)
    return result
  }
}
