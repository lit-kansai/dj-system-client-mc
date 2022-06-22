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

  if (path === GOOGLE_LOGIN_PAGE_PATH) {
    return onEnterGoogleLoginPage()
  }

  if (isLoginRequired(path)) {
    return onEnterLoginRequiredPage()
  }

  if (path === API_GOOGLE_CALLBACK_PATH) {
    return new Promise(() => {
      onEnterGoogleLoginCallbackPage(query as GoogleLoginCallbackQuery)
    })
  }
}

const isLoginRequired = (path: string): boolean => {
  return path.includes('mc') || path.includes('admin')
}

const onEnterGoogleLoginPage = () => {
  const { hasUserCredentials } = useUserCredentials()
  if (hasUserCredentials()) {
    const { redirect } = $nuxt
    redirect('/mc')
  }
}

const onEnterLoginRequiredPage = () => {
  // const { redirect } = $nuxt
  // const { hasUserCredentials } = useUserCredentials()
  // if (!hasUserCredentials()) {
  //   redirect(GOOGLE_LOGIN_PAGE_PATH)
  // }
}

const onEnterGoogleLoginCallbackPage = (query: GoogleLoginCallbackQuery) => {
  const { redirect } = $nuxt
  const params: ILoggedInGoogleParams = {
    ...query,
    redirectUrl: process.env.REDIRECT_URL ?? '',
  }
  const { loggedInGoogle } = useLoggedInGoogle(params)
  loggedInGoogle.then((_) => redirect('/mc?message=loginSuccess'))
}
