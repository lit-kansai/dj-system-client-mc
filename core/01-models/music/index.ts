import * as Helper from './helper'
import { MusicOverview } from '~/types/components/music_overview'

export interface IMusicEntity {
  id: string
  artists: string
  album: string
  thumbnail: string
  name: string
  duration: number
}

export interface IMusicHelper {
  toMusicOverviewComponentProps: MusicOverview
}

export type IMusicModel = IMusicEntity & IMusicHelper

export class MusicModel implements IMusicModel {
  private readonly _id: string
  private readonly _artists: string
  private readonly _album: string
  private readonly _thumbnail: string
  private readonly _name: string
  private readonly _duration: number

  constructor(response: IMusicEntity) {
    this._id = response.id
    this._artists = response.artists
    this._album = response.album
    this._thumbnail = response.thumbnail
    this._name = response.name
    this._duration = response.duration
  }

  get id(): string {
    return this._id
  }

  get artists(): string {
    return this._artists
  }

  get thumbnail(): string {
    return this._thumbnail
  }

  get album(): string {
    return this._album
  }

  get name(): string {
    return this._name
  }

  get duration(): number {
    return this._duration
  }

  get toMusicOverviewComponentProps(): MusicOverview {
    return Helper.toMusicOverview(this)
  }
}
