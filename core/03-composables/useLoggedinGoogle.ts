import { LoggedinGoogleRepositoryImpl } from '~/core/02-repositories/loggedInGoogle'
import { UserCredentialsRepositoryImpl } from '~/core/02-repositories/UserCredentials'
import { ILoggedInGoogleParams } from '~/types/params/loggedInGoogleParams'

export const useLoggedInGoogle = (
  params: ILoggedInGoogleParams
): {
  loggedInGoogle: Promise<String>
} => {
  const loggedInGoogleRepository = new LoggedinGoogleRepositoryImpl()
  const userCredentialsRepository = new UserCredentialsRepositoryImpl()

  const loggedInGoogle = loggedInGoogleRepository.post(params).then((res) => {
    return userCredentialsRepository.save(res)
  })

  return {
    loggedInGoogle,
  }
}
