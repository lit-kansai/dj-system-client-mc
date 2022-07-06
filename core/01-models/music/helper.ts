import { MusicOverview } from '~/types/components/music_overview'
import { IMusicModel } from '~/core/01-models/music'

export const toMusicOverview = (model: IMusicModel): MusicOverview => {
  const musicOverview: MusicOverview = {
    musicTitle: model.name,
    artistName: model.artists.map((artist) => artist.name).join(', '),
    imageUrl: model.album.jacketUrl,
  }
  return musicOverview
}
