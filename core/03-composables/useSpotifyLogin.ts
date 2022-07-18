import { ISpotifyLoginRepository } from '~/core/02-repositories/spotifyLogin'

export const useSpotifyLogin = (repository: ISpotifyLoginRepository) => {
  const loginSpotify = () => {
    const REDIRECT_URL =
      process.env.SPOTIFY_LOGIN_REDIRECT_URL ??
      'https://dj-system.lit-kansai-mentors.com/api/spotify/callback'
    repository
      .fetch(REDIRECT_URL)
      .then((value) => window.open(value.redirectUrl))
  }
  return { loginSpotify }
}
