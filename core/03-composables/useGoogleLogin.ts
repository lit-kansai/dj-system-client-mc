import { IGoogleLoginModel } from '~/core/01-models/googleLogin'
import { GoogleLoginRepositoryImpl } from '~/core/02-repositories/googleLogin'

export const useGoogleLogin = (): {
  googleLogin: Promise<IGoogleLoginModel>
} => {
  const repository = new GoogleLoginRepositoryImpl()
  const REDIRECT_URL = process.env.REDIRECT_URL as string
  const googleLogin = repository.fetch(REDIRECT_URL)
  return {
    googleLogin,
  }
}
