export interface IRoomModel {
  urlName: string
  roomName: string
  description: string
  users: string[]
  createdAt: string
  updatedAt: string
}

export class RoomModel implements IRoomModel {
  private readonly _urlName: string
  private readonly _roomName: string
  private readonly _description: string
  private readonly _users: string[]
  private readonly _createdAt: string
  private readonly _updatedAt: string

  constructor(response: IRoomModel) {
    this._urlName = response.urlName
    this._roomName = response.roomName
    this._description = response.description
    this._users = response.users
    this._createdAt = response.createdAt
    this._updatedAt = response.updatedAt
  }

  get urlName(): string {
    return this._urlName
  }

  get roomName(): string {
    return this._roomName
  }

  get description(): string {
    return this._description
  }

  get users(): string[] {
    return this._users
  }

  get createdAt(): string {
    return this._createdAt
  }

  get updatedAt(): string {
    return this._updatedAt
  }
}
