import { ILocalUserCredentialsModel } from '~/core/01-models/localUserCredentials'
import { ILocalUserCredentialsRepository } from '~/core/02-repositories/localUserCredentials'

export const useLocalUserCredentials = (
  repository: ILocalUserCredentialsRepository
) => {
  const hasUserCredentials = (): boolean => {
    return !!repository.fetch()
  }

  // NOTE: ちゃんと消えてたらtrueが返ります
  const clear = (): boolean => {
    const ok = repository.clear()
    return ok
  }

  const fetch = (): ILocalUserCredentialsModel | null => {
    return repository.fetch()
  }

  const save = (userInfo: ILocalUserCredentialsModel): boolean => {
    return repository.save(userInfo)
  }

  return {
    hasUserCredentials,
    fetch,
    clear,
    save,
  }
}
