import { MusicModel } from '~/core/01-models/music'
import { Card } from '~/types/components/card'

export const toCard = (model: MusicModel): Card => {
  const card: Card = {
    musicTitle: model.name,
    artistName: model.artists.map((artist) => artist.name).join(', '),
    imageUrl: model.album.jacketUrl,
  }
  return card
}
