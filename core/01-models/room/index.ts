export interface IRoomModel {
  id: number
  ownerUserId: number
  displayId: string
  name: string
  playlistId: number | null
  description: string
  createdAt: string
  updatedAt: string
}

export class RoomModel implements IRoomModel {
  private readonly _id: number
  private readonly _ownerUserId: number
  private readonly _displayId: string
  private readonly _name: string
  private readonly _playlistId: number | null
  private readonly _description: string
  private readonly _createdAt: string
  private readonly _updatedAt: string

  constructor(response: IRoomModel) {
    this._id = response.id
    this._ownerUserId = response.ownerUserId
    this._displayId = response.displayId
    this._name = response.name
    this._playlistId = response.playlistId
    this._description = response.description
    this._createdAt = response.createdAt
    this._updatedAt = response.updatedAt
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

  get playlistId(): number | null {
    return this._playlistId
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get createdAt(): string {
    return this._createdAt
  }

  get updatedAt(): string {
    return this._updatedAt
  }
}
