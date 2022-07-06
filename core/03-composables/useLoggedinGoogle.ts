import { LoggedinGoogleRepository } from '~/core/02-repositories/loggedInGoogle'
import { UserCredentialsRepository } from '~/core/02-repositories/UserCredentials'
import { ILoggedInGoogleParams } from '~/types/params/loggedInGoogleParams'

export const useLoggedInGoogle = (
  params: ILoggedInGoogleParams
): {
  loggedInGoogle: Promise<String>
} => {
  const loggedInGoogleRepository = new LoggedinGoogleRepository()
  const userCredentialsRepository = new UserCredentialsRepository()

  const loggedInGoogle = loggedInGoogleRepository.post(params).then((res) => {
    return userCredentialsRepository.save(res)
  })

  return {
    loggedInGoogle,
  }
}
