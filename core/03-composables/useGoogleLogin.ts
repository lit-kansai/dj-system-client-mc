import { IGoogleLoginModel } from '~/core/01-models/googleLogin'
import { GoogleLoginRepository } from '~/core/02-repositories/googleLogin'

export const useGoogleLogin = (): Promise<IGoogleLoginModel> => {
  const repository = new GoogleLoginRepository()
  const REDIRECT_URL =
    process.env.REDIRECT_URL ??
    'https://dj-system.lit-kansai-mentors.com/api/google/callback'
  return repository.fetch(REDIRECT_URL)
}
