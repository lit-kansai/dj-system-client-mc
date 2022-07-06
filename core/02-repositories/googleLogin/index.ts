import { IGoogleLoginModel } from '~/core/01-models/googleLogin'
import { $axios } from '~/utils/api'

export interface IGoogleLoginRepository {
  fetch(redirectURL: string): Promise<IGoogleLoginModel>
}

export class GoogleLoginRepository implements IGoogleLoginRepository {
  fetch(redirectURL: String): Promise<IGoogleLoginModel> {
    return $axios.$get<IGoogleLoginModel>('/user/login', {
      params: {
        redirect_url: redirectURL,
      },
    })
  }
}
