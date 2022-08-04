import { IGoogleLoginModel } from '~/core/01-models/googleLogin'
import { GoogleLoginRepository } from '~/core/02-repositories/googleLogin'
import { config } from '~/environments/config'

export const useGoogleLogin = (): Promise<IGoogleLoginModel> => {
  const repository = new GoogleLoginRepository()
  const REDIRECT_URL = config.googleLoginRedirectUrl
  return repository.fetch(REDIRECT_URL)
}
