export interface IRegisterSpotifyTokenModel {
  ok: boolean
}

export class RegisterSpotifyTokenModel implements IRegisterSpotifyTokenModel {
  private readonly _ok: boolean

  constructor(response: IRegisterSpotifyTokenModel) {
    this._ok = response.ok
  }

  get ok(): boolean {
    return this._ok
  }
}
