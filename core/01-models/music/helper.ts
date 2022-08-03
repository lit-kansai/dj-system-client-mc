import { MusicOverview } from '~/types/components/music_overview'
import { IMusicModel } from '~/core/01-models/music'

export const toMusicOverview = (model: IMusicModel): MusicOverview => {
  const musicOverview: MusicOverview = {
    musicTitle: model.name,
    artistName: model.artists,
    imageUrl: model.thumbnail,
  }
  return musicOverview
}

export const secondsToMMSS = (model: IMusicModel): string => {
  const seconds = model.duration
  return `${(seconds / 60) | 0}:${('00' + (seconds % 60)).slice(-2)}`
}

export const spotifyUrl = (model: IMusicModel): string => {
  return `https://open.spotify.com/track/${model.id.split(':')[2]}`
}
