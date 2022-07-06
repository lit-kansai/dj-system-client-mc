export interface IUserModel {
  name: string
  avatarUrl: string
  isAdmin: boolean
}

export class UserModel implements IUserModel {
  private readonly _name: string
  private readonly _avatarUrl: string
  private readonly _isAdmin: boolean

  constructor(response: IUserModel) {
    this._name = response.name
    this._avatarUrl = response.avatarUrl
    this._isAdmin = response.isAdmin
  }

  get name(): string {
    return this._name
  }

  get avatarUrl(): string {
    return this._avatarUrl
  }

  get isAdmin(): boolean {
    return this._isAdmin
  }
}
