export interface IUpdateRoomModel {
  id: number
  ownerUserId: number
  displayId: string
  name: string
  description: string
  playlistId: string
}

export class UpdateRoomModel implements IUpdateRoomModel {
  private readonly _id: number
  private readonly _ownerUserId: number
  private readonly _displayId: string
  private readonly _name: string
  private readonly _description: string
  private readonly _playlistId: string
  constructor(response: IUpdateRoomModel) {
    this._id = response.id
    this._ownerUserId = response.ownerUserId
    this._displayId = response.displayId
    this._name = response.displayId
    this._description = response.description
    this._playlistId = response.playlistId
  }

  get id(): number {
    return this._id
  }

  get ownerUserId(): number {
    return this._ownerUserId
  }

  get displayId(): string {
    return this._displayId
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get playlistId(): string {
    return this._playlistId
  }
}
