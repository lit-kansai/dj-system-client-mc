export interface ISpotifyLoginModel {
  redirectUrl: string
}

export class SpotifyLoginModel implements ISpotifyLoginModel {
  private readonly _redirectUrl: string

  constructor(response: ISpotifyLoginModel) {
    this._redirectUrl = response.redirectUrl
  }

  get redirectUrl(): string {
    return this._redirectUrl
  }
}
