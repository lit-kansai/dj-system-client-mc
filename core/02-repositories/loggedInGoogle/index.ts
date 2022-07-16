import { IUserCredentialsModel } from '~/core/01-models/userCredentials'
import { ILoggedInGoogleParams } from '~/types/params/loggedInGoogleParams'
import { $axios } from '~/utils/api'

export interface ILoggedInGoogleRepository {
  post(params: ILoggedInGoogleParams): Promise<IUserCredentialsModel>
}

export class LoggedinGoogleRepository implements ILoggedInGoogleRepository {
  post(params: ILoggedInGoogleParams): Promise<IUserCredentialsModel> {
    return $axios.$post<IUserCredentialsModel>('mc/auth/signin/callback', {
      ...params,
      convert: true,
    })
  }
}
