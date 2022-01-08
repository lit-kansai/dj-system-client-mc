export interface Artist {
  id: string
  name: string
}

export interface Album {
  name: string
  jacketUrl: string
}

export interface Music {
  id: string
  artists: Artist[]
  album: Album
  name: string
  duration: number
}

export class MusicModel implements Music {
  private readonly _id: string
  private readonly _artists: Artist[]
  private readonly _album: Album
  private readonly _name: string
  private readonly _duration: number

  constructor(response: Music) {
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
}
