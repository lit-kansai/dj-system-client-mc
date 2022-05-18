export interface IUserCredentialsModel {
  apiToken: string
  userId: string
}

export class UserCredentialsModel implements IUserCredentialsModel {
  private readonly _apiToken: string
  private readonly _userId: string

  constructor(response: IUserCredentialsModel) {
    this._apiToken = response.apiToken
    this._userId = response.userId
  }

  get apiToken(): string {
    return this._apiToken
  }

  get userId(): string {
    return this._userId
  }
}

export namespace UsercredentialsModelNameSpace {}
