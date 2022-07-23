import { IFetchUserProfileModel } from '~/core/01-models/fetchUserProfile'
import { $axios } from '~/utils/api'

export interface IFetchUserProfileRepository {
  get(): Promise<IFetchUserProfileModel>
}

export class FetchUserProfileRepository implements IFetchUserProfileRepository {
  async get(): Promise<IFetchUserProfileModel> {
    const result = await $axios.$get<IFetchUserProfileModel>('/mc/user')
    return result
  }
}
