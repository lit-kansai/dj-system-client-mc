import { IUserCredentialsModel } from '~/core/01-models/userCredentials'
import { UserCredentialsRepositoryImpl } from '~/core/02-repositories/UserCredentials'

const repository = new UserCredentialsRepositoryImpl()
const saveLocalStorageUserCredentials = (
  userInfo: IUserCredentialsModel
): { save: Promise<String> } => {
  const save = repository.save(userInfo)
  return { save }
}

const fetchLocalStorageUserCredentials = (): {
  fetch: Promise<IUserCredentialsModel>
} => {
  const fetch = repository.fetch()
  return { fetch }
}

export const useLocalStorageUserCredentials = () => {
  return {
    saveLocalStorageUserCredentials,
    fetchLocalStorageUserCredentials,
  }
}
