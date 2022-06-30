import { MusicModel } from '~/core/01-models/music'
import { MusicOverview } from '~/types/components/music_overview'

export const toMusicOverview = (model: MusicModel): MusicOverview => {
  const musicOverview: MusicOverview = {
    musicTitle: model.name,
    artistName: model.artists.map((artist) => artist.name).join(', '),
    imageUrl: model.album.jacketUrl,
  }
  return musicOverview
}
