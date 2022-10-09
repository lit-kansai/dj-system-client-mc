import { ILocalUserCredentialsModel } from '~/core/01-models/localUserCredentials'
import { ILoggedInGoogleParams } from '~/types/params/loggedInGoogleParams'
import { $axios } from '~/utils/api'

export interface ILoggedInGoogleRepository {
  post(params: ILoggedInGoogleParams): Promise<ILocalUserCredentialsModel>
}

export class LoggedInGoogleRepository implements ILoggedInGoogleRepository {
  post(params: ILoggedInGoogleParams): Promise<ILocalUserCredentialsModel> {
    return $axios.$post<ILocalUserCredentialsModel>(
      '/mc/auth/signin/callback',
      {
        ...params,
        convert: true,
      }
    )
  }
}
