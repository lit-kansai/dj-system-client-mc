import { IUserCredentialsModel } from '~/core/01-models/userCredentials'
import { ILoggedInGoogleParams } from '~/types/params/loggedInGoogleParams'
import { $axios } from '~/utils/api'

export interface ILoggedInGoogleRepository {
  post(params: ILoggedInGoogleParams): Promise<IUserCredentialsModel>
}

export class LoggedinGoogleRepositoryImpl implements ILoggedInGoogleRepository {
  post(params: ILoggedInGoogleParams): Promise<IUserCredentialsModel> {
    const data = new FormData()
    data.append('code', params.code)
    data.append('scope', params.scope)
    data.append('state', params.state)
    data.append('redirect_url', params.redirectUrl)
    return $axios.$post<IUserCredentialsModel>('/user/loggedInGoogle', data)
  }
}
