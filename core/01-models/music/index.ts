import * as Helper from './helper'
import { Card } from '~/types/components/card'

export interface Artist {
  id: string
  name: string
}

export interface Album {
  name: string
  jacketUrl: string
}

export interface IMusicEntity {
  id: string
  artists: Artist[]
  album: Album
  name: string
  duration: number
}

export interface IMusicHelper {
  toCardComponentProps: Card
}

export type IMusicModel = IMusicEntity & IMusicHelper

export class MusicModel implements IMusicModel {
  private readonly _id: string
  private readonly _artists: Artist[]
  private readonly _album: Album
  private readonly _name: string
  private readonly _duration: number

  constructor(response: IMusicEntity) {
    this._id = response.id
    this._artists = response.artists
    this._album = response.album
    this._name = response.name
    this._duration = response.duration
  }

  get id(): string {
    return this._id
  }

  get artists(): Artist[] {
    return this._artists
  }

  get album(): Album {
    return this._album
  }

  get name(): string {
    return this._name
  }

  get duration(): number {
    return this._duration
  }

  get toCardComponentProps(): Card {
    return Helper.toCard(this)
  }
}
