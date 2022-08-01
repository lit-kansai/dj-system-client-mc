import { LowerProviderName } from '~/types/data/lowerProviderName'

export interface ILinkedProviders {
  provider: LowerProviderName
  isConnected: boolean
}
export interface IFetchUserProfileModel {
  name: string
  icon: string
  isAdmin: boolean
  email: string
  linkedProviders: ILinkedProviders[]
}

export class FetchUserProfileModel implements IFetchUserProfileModel {
  private readonly _name: string
  private readonly _icon: string
  private readonly _isAdmin: boolean
  private readonly _email: string
  private readonly _linkedProviders: ILinkedProviders[]
  constructor(response: IFetchUserProfileModel) {
    this._name = response.name
    this._icon = response.icon
    this._isAdmin = response.isAdmin
    this._email = response.email
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

  get email(): string {
    return this._email
  }

  get linkedProviders(): ILinkedProviders[] {
    return this._linkedProviders
  }
}
