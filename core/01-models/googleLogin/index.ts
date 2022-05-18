export interface IGoogleLoginModel {
  redirectUrl: string
}

export class GoogleLoginModel implements IGoogleLoginModel {
  private readonly _redirectUrl: string

  constructor(response: IGoogleLoginModel) {
    this._redirectUrl = response.redirectUrl
  }

  get redirectUrl(): string {
    return this._redirectUrl
  }
}
