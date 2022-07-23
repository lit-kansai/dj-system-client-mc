export interface IFetchUserProfileModel {
  name: string
  icon: string
  isAdmin: boolean
  linkedProviders: string[]
}

export class FetchUserProfileModel implements IFetchUserProfileModel {
  private readonly _name: string
  private readonly _icon: string
  private readonly _isAdmin: boolean
  private readonly _linkedProviders: string[]
  constructor(response: IFetchUserProfileModel) {
    this._name = response.name
    this._icon = response.icon
    this._isAdmin = response.isAdmin
    this._linkedProviders = response.linkedProviders
  }

  get name(): string {
    return this._name
  }

  get icon(): string {
    return this._icon
  }

  get isAdmin(): boolean {
    return this._isAdmin
  }

  get linkedProviders(): string[] {
    return this._linkedProviders
  }
}
