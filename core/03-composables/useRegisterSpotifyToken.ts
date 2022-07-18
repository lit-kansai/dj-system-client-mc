import { IRegisterSpotifyTokenModel } from '~/core/01-models/registerSpotifyToken'
import { IRegisterSpotifyTokenRepository } from '~/core/02-repositories/registerSpotifyToken'
import { RegisterSpotifyTokenParams } from '~/types/params/registerSpotifyTokenParams'

export const useRegisterSpotifyToken = (
  repository: IRegisterSpotifyTokenRepository
) => {
  const registerSpotifyToken = (
    params: RegisterSpotifyTokenParams
  ): Promise<IRegisterSpotifyTokenModel> => {
    return repository.post(params)
  }
  return { registerSpotifyToken }
}
