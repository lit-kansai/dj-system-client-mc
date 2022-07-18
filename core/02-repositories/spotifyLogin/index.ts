import { ISpotifyLoginModel } from '~/core/01-models/spotifyLogin'
import { $axios } from '~/utils/api'

export interface ISpotifyLoginRepository {
  fetch(redirectURL: string): Promise<ISpotifyLoginModel>
}

export class SpotifyLoginRepository implements ISpotifyLoginRepository {
  fetch(redirectURL: String): Promise<ISpotifyLoginModel> {
    return $axios.$get<ISpotifyLoginModel>('/mc/user/link/spotify', {
      params: {
        redirect_url: redirectURL,
      },
    })
  }
}
