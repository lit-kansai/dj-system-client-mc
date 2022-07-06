import { IUserCredentialsModel } from '~/core/01-models/userCredentials'
import { USER_CREDENTIALS_LOCAL_STORAGE_KEY } from '~/utils/constants'

export interface IUserCredentialsRepository {
  save(userInfo: IUserCredentialsModel): Promise<String>
  fetch(): Promise<IUserCredentialsModel>
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
  fetch(): Promise<IUserCredentialsModel> {
    const userInfo = JSON.parse(
      localStorage.getItem(USER_CREDENTIALS_LOCAL_STORAGE_KEY) as string
    ) as IUserCredentialsModel
    return new Promise((resolve) => resolve(userInfo))
  }
}
