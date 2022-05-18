import { useContext } from '@nuxtjs/composition-api'
import { IGoogleLoginModel } from '~/core/01-models/googleLogin'
export interface IGoogleLoginRepository {
  fetch(redirectURL: string): Promise<IGoogleLoginModel>
}

export class GoogleLoginRepositoryImpl implements IGoogleLoginRepository {
  fetch(redirectURL: String): Promise<IGoogleLoginModel> {
    const { $axios } = useContext()
    return $axios.$get<IGoogleLoginModel>('/user/login', {
      params: {
        redirect_url: redirectURL,
      },
    })
  }
}
