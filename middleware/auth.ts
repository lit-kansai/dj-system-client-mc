import { Context } from '@nuxt/types'
import {
  GOOGLE_LOGIN_PAGE_PATH,
  API_GOOGLE_CALLBACK_PATH,
  API_SPOTIFY_CALLBACK_PATH,
} from '~/utils/constants'
import { ILoggedInGoogleParams } from '~/types/params/loggedInGoogleParams'
import { GoogleLoginCallbackQuery } from '~/types/query/googleLoginCallbackQuery'
import { useLoggedInGoogle } from '~/core/03-composables/useLoggedinGoogle'
import { useUserCredentials } from '~/core/03-composables/useUserCredentials'
import { $nuxt } from '~/utils/nuxtInstance'
import { RegisterSpotifyTokenParams } from '~/types/params/registerSpotifyTokenParams'
import { useRegisterSpotifyToken } from '~/core/03-composables/useRegisterSpotifyToken'
import { RegisterSpotifyTokenRepository } from '~/core/02-repositories/registerSpotifyToken'
import { config } from '~/environments/config'

export default function (context: Context) {
  const { route } = context
  const { path, query } = route

  if (isGoogleLoginPage(path)) {
    return onEnterGoogleLoginPage()
  }

  if (isLoginRequiredPage(path)) {
    return onEnterLoginRequiredPage()
  }

  if (isGoogleAPICallbackPage(path)) {
    return new Promise(() => {
      onEnterGoogleLoginCallbackPage(query as GoogleLoginCallbackQuery)
    })
  }

  if (isSpotifyAPICallbackPage(path)) {
    return new Promise(() => {
      const spotifyLoginCallbackQuery = query as Record<
        'code' | 'state',
        string
      >
      onEnterSpotifyLoginCallbackPage({
        code: spotifyLoginCallbackQuery.code,
        redirectUrl: config.spotifyLoginRedirectUrl,
      })
    })
  }
}

const isLoginRequiredPage = (path: string): boolean => {
  const mcPageRegex = /^(\/mc.*)/
  return mcPageRegex.test(path) || path.includes('admin')
}

const isGoogleLoginPage = (path: string): boolean => {
  return path.includes(GOOGLE_LOGIN_PAGE_PATH)
}

const isGoogleAPICallbackPage = (path: string): boolean => {
  return path.includes(API_GOOGLE_CALLBACK_PATH)
}

const isSpotifyAPICallbackPage = (path: string): boolean => {
  return path.includes(API_SPOTIFY_CALLBACK_PATH)
}

const onEnterGoogleLoginPage = () => {
  const { hasUserCredentials } = useUserCredentials()
  if (hasUserCredentials()) {
    const { redirect } = $nuxt
    redirect('/mc')
  }
}

const onEnterLoginRequiredPage = () => {
  const { redirect } = $nuxt
  const { hasUserCredentials } = useUserCredentials()
  if (!hasUserCredentials()) {
    redirect(GOOGLE_LOGIN_PAGE_PATH)
  }
}

const onEnterGoogleLoginCallbackPage = (query: GoogleLoginCallbackQuery) => {
  const { redirect } = $nuxt
  const params: ILoggedInGoogleParams = {
    ...query,
    redirectUrl: config.googleLoginRedirectUrl,
  }
  const { loggedInGoogle } = useLoggedInGoogle(params)
  loggedInGoogle.then((_) => redirect('/mc?message=loginSuccess'))
}
const onEnterSpotifyLoginCallbackPage = (query: RegisterSpotifyTokenParams) => {
  const { redirect } = $nuxt
  const { registerSpotifyToken } = useRegisterSpotifyToken(
    new RegisterSpotifyTokenRepository()
  )
  registerSpotifyToken(query).then((result) => {
    if (result.ok) {
      redirect('/mc?message=SpotifyConnectSuccess')
    } else {
      alert('An error occurred')
    }
  })
}
