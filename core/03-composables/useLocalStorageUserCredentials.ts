import { IUserCredentialsModel } from '~/core/01-models/userCredentials'
import { IUserCredentialsRepository } from '~/core/02-repositories/UserCredentials'

export const useLocalStorageUserCredentials = (
  repository: IUserCredentialsRepository
) => {
  const save = (userInfo: IUserCredentialsModel): Promise<String> => {
    return repository.save(userInfo)
  }

  const fetch = (): Promise<IUserCredentialsModel | null> => {
    return repository.fetch()
  }

  return {
    save,
    fetch,
  }
}
