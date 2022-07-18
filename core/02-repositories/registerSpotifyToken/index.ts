import { IRegisterSpotifyTokenModel } from '~/core/01-models/registerSpotifyToken'
import { RegisterSpotifyTokenParams } from '~/types/params/registerSpotifyTokenParams'
import { $axios } from '~/utils/api'

export interface IRegisterSpotifyTokenRepository {
  post(params: RegisterSpotifyTokenParams): Promise<IRegisterSpotifyTokenModel>
}

export class RegisterSpotifyTokenRepository
  implements IRegisterSpotifyTokenRepository
{
  async post(
    params: RegisterSpotifyTokenParams
  ): Promise<IRegisterSpotifyTokenModel> {
    const result = await $axios.$post<IRegisterSpotifyTokenModel>(
      '/mc/user/link/spotify/callback',
      {
        ...params,
        convert: true,
      }
    )
    return result
  }
}
