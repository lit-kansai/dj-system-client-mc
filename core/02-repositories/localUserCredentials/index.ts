import { ILocalUserCredentialsModel } from '~/core/01-models/localUserCredentials'
import { USER_CREDENTIALS_LOCAL_STORAGE_KEY } from '~/utils/constants'

export interface ILocalUserCredentialsRepository {
  save(userInfo: ILocalUserCredentialsModel): boolean
  fetch(): ILocalUserCredentialsModel | null
  clear(): boolean
}

export class LocalUserCredentialsRepository
  implements ILocalUserCredentialsRepository
{
  save(userInfo: ILocalUserCredentialsModel): boolean {
    localStorage.setItem(
      USER_CREDENTIALS_LOCAL_STORAGE_KEY,
      JSON.stringify(userInfo)
    )
    return !!localStorage.getItem(USER_CREDENTIALS_LOCAL_STORAGE_KEY)
  }

  fetch(): ILocalUserCredentialsModel | null {
    const _userInfo = localStorage.getItem(USER_CREDENTIALS_LOCAL_STORAGE_KEY)
    if (!_userInfo) {
      return null
    }
    return JSON.parse(_userInfo) as ILocalUserCredentialsModel
  }

  clear(): boolean {
    localStorage.clear()
    return !localStorage.length
  }
}
