import { IGoogleLoginModel } from '~/core/01-models/googleLogin'
import { GoogleLoginRepositoryImpl } from '~/core/02-repositories/googleLogin'

export const useGoogleLogin = (): Promise<IGoogleLoginModel> => {
  const repository = new GoogleLoginRepositoryImpl()
  const REDIRECT_URL = process.env.REDIRECT_URL as string
  return repository.fetch(REDIRECT_URL)
}
