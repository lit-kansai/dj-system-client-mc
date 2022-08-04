import { ISpotifyLoginRepository } from '~/core/02-repositories/spotifyLogin'
import { config } from '~/environments/config'

export const useSpotifyLogin = (repository: ISpotifyLoginRepository) => {
  const loginSpotify = () => {
    const REDIRECT_URL = config.spotifyLoginRedirectUrl
    repository
      .fetch(REDIRECT_URL)
      .then((value) => window.open(value.redirectUrl))
  }
  return { loginSpotify }
}
