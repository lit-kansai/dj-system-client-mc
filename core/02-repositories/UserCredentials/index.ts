import { IUserCredentialsModel } from '~/core/01-models/userCredentials'
import { USER_CREDENTIALS_LOCAL_STORAGE_KEY } from '~/utils/constants'

export interface IUserCredentialsRepository {
  save(userInfo: IUserCredentialsModel): Promise<String>
  fetch(): Promise<IUserCredentialsModel | null>
}

export class UserCredentialsRepository implements IUserCredentialsRepository {
  save(userInfo: IUserCredentialsModel): Promise<String> {
    localStorage.setItem(
      USER_CREDENTIALS_LOCAL_STORAGE_KEY,
      JSON.stringify(userInfo)
    )
    return new Promise((resolve) => resolve('success'))
  }

  // TODO: エラーハンドリングやりたい
  fetch(): Promise<IUserCredentialsModel | null> {
    return new Promise((resolve) => {
      const _userInfo = localStorage.getItem(USER_CREDENTIALS_LOCAL_STORAGE_KEY)
      if (!_userInfo) {
        resolve(null)
      }
      if (_userInfo) {
        const userInfo = JSON.parse(_userInfo) as IUserCredentialsModel
        resolve(userInfo)
      }
    })
  }
}
