import * as Helper from './helper'
import { UserRequestCardProps } from '~/types/components/userRequestCard'
export interface ILetter {
  id: number
  roomId: number
  radioName: string
  message: string
}
export interface IUserRequestEntity {
  id: number
  letterId: number
  providedMusicId: string
  name: string
  artist: string
  album: string
  thumbnail: string
  duration: number
  createdAt: string
  updatedAt: string
  letter: ILetter
}
export interface IUserRequestHelper {
  formatedDate: string
  toUserRequestCardProps: UserRequestCardProps
}

export type IUserRequestModel = IUserRequestEntity & IUserRequestHelper

export class UserRequestModel implements IUserRequestModel {
  private readonly _id: number
  private readonly _letterId: number
  private readonly _providedMusicId: string
  private readonly _name: string
  private readonly _album: string
  private readonly _artist: string
  private readonly _thumbnail: string
  private readonly _duration: number
  private readonly _createdAt: string
  private readonly _updatedAt: string
  private readonly _letter: ILetter

  constructor(response: IUserRequestEntity) {
    this._id = response.id
    this._letterId = response.letterId
    this._providedMusicId = response.providedMusicId
    this._name = response.name
    this._album = response.album
    this._artist = response.artist
    this._thumbnail = response.thumbnail
    this._duration = response.duration
    this._createdAt = response.createdAt
    this._updatedAt = response.updatedAt
    this._letter = response.letter
  }

  get id(): number {
    return this._id
  }

  get letterId(): number {
    return this._letterId
  }

  get providedMusicId(): string {
    return this._providedMusicId
  }

  get name(): string {
    return this._name
  }

  get album(): string {
    return this._album
  }

  get artist(): string {
    return this._artist
  }

  get thumbnail(): string {
    return this._thumbnail
  }

  get duration(): number {
    return this._duration
  }

  get createdAt(): string {
    return this._createdAt
  }

  get updatedAt(): string {
    return this._updatedAt
  }

  get letter(): ILetter {
    return this._letter
  }

  get formatedDate(): string {
    return Helper.formatedDate(this)
  }

  get toUserRequestCardProps(): UserRequestCardProps {
    return Helper.toUserRequestCardProps(this)
  }
}
