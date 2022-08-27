export interface ILocalUserCredentialsModel {
  apiToken: string
  userId: string
}

export class LocalUserCredentialsModel implements ILocalUserCredentialsModel {
  private readonly _apiToken: string
  private readonly _userId: string

  constructor(response: ILocalUserCredentialsModel) {
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
