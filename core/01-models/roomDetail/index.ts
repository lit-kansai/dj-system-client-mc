import * as Helper from './helper'
import { IRoomDetail } from '~/types/components/roomDetail'

export interface User {
  id: number
  isAdmin: boolean
  googleId: string
}

export interface Letter {
  id: number
  roomId: number
  radioName: string
  message: string
}

export interface IRoomDetailEntity {
  id: number
  ownerUserId: number
  displayId: string
  name: string
  description: string
  playlistId: string
  provider: string
  users: User[]
  letters: Letter[]
}

interface IRoomDetailHelper {
  toRoomDetailComponentProps: IRoomDetail
}

export type IRoomDetailModel = IRoomDetailEntity & IRoomDetailHelper

export class RoomDetailModel implements IRoomDetailModel {
  private readonly _id: number
  private readonly _ownerUserId: number
  private readonly _displayId: string
  private readonly _name: string
  private readonly _description: string
  private readonly _playlistId: string
  private readonly _provider: string
  private readonly _users: User[]
  private readonly _letters: Letter[]
  constructor(response: IRoomDetailEntity) {
    this._id = response.id
    this._ownerUserId = response.ownerUserId
    this._displayId = response.displayId
    this._name = response.name
    this._description = response.description
    this._playlistId = response.playlistId
    this._provider = response.provider
    this._users = response.users
    this._letters = response.letters
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

  get provider(): string {
    return this._provider
  }

  get users(): User[] {
    return this._users
  }

  get letters(): Letter[] {
    return this._letters
  }

  get toRoomDetailComponentProps(): IRoomDetail {
    return Helper.toRoomDetailComponentProps(this)
  }
}
