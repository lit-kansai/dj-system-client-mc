import { ILocalUserCredentialsModel } from '~/core/01-models/localUserCredentials'
import { ILocalUserCredentialsRepository } from '~/core/02-repositories/localUserCredentials'

export const useLocalStorageUserCredentials = (
  repository: ILocalUserCredentialsRepository
) => {
  const save = (userInfo: ILocalUserCredentialsModel): boolean => {
    return repository.save(userInfo)
  }

  const fetch = (): ILocalUserCredentialsModel | null => {
    return repository.fetch()
  }

  return {
    save,
    fetch,
  }
}
