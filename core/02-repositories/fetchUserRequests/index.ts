import {
  IUserRequestEntity,
  IUserRequestModel,
  UserRequestModel,
} from '~/core/01-models/userRequest'
import { IFetchUserRequestsParams } from '~/types/params/fetchUserRequests'
import { $axios } from '~/utils/api'

export interface IFetchUserRequestsRepository {
  fetch(params: IFetchUserRequestsParams): Promise<IUserRequestModel[]>
}

export class FetchUserRequestsRepository
  implements IFetchUserRequestsRepository
{
  async fetch(params: IFetchUserRequestsParams): Promise<IUserRequestModel[]> {
    const result = await $axios
      .$get<IUserRequestEntity[]>(`/mc/room/${params.roomId}/musics`)
      .then((userRequests) => {
        const requests = userRequests.map(
          (userRequest) => new UserRequestModel(userRequest)
        )
        return requests
      })
    return result
  }
}
