import { LoggedInGoogleRepository } from '~/core/02-repositories/loggedInGoogle'
import { LocalUserCredentialsRepository } from '~/core/02-repositories/localUserCredentials'
import { ILoggedInGoogleParams } from '~/types/params/loggedInGoogleParams'

export const useLoggedInGoogle = (
  params: ILoggedInGoogleParams
): {
  loggedInGoogle: Promise<boolean>
} => {
  const loggedInGoogleRepository = new LoggedInGoogleRepository()
  const localUserCredentialsRepository = new LocalUserCredentialsRepository()

  const loggedInGoogle = loggedInGoogleRepository.post(params).then((res) => {
    return localUserCredentialsRepository.save(res)
  })

  return {
    loggedInGoogle,
  }
}
