import { Context } from '@nuxt/types'
import {
  GOOGLE_LOGIN_PAGE_PATH,
  API_GOOGLE_CALLBACK_PATH,
} from '~/utils/constants'
import { ILoggedInGoogleParams } from '~/types/params/loggedInGoogleParams'
import { GoogleLoginCallbackQuery } from '~/types/query/googleLoginCallbackQuery'
import { useLoggedInGoogle } from '~/core/03-composables/useLoggedinGoogle'
import { useUserCredentials } from '~/core/03-composables/useUserCredentials'
import { $nuxt } from '~/utils/nuxtInstance'

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
}

const isLoginRequiredPage = (path: string): boolean => {
  return path.includes('mc') || path.includes('admin')
}

const isGoogleLoginPage = (path: string): boolean => {
  return path.includes(GOOGLE_LOGIN_PAGE_PATH)
}

const isGoogleAPICallbackPage = (path: string): boolean => {
  return path.includes(API_GOOGLE_CALLBACK_PATH)
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
    redirectUrl:
      process.env.GOOGLE_LOGIN_REDIRECT_URL ??
      'https://dj-system.lit-kansai-mentors.com/api/google/callback',
  }
  const { loggedInGoogle } = useLoggedInGoogle(params)
  loggedInGoogle.then((_) => redirect('/mc?message=loginSuccess'))
}
