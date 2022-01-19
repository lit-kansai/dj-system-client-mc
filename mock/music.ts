import { MusicModel, IMusicModel, IMusicEntity } from '~/core/01-models/music'

export const entity: IMusicEntity = {
  id: '1',
  artists: [
    {
      id: '1',
      name: 'PSUQUI',
    },
  ],
  album: {
    name: 'STYLEY!',
    jacketUrl:
      'https://i.scdn.co/image/ab67616d00001e021a8bba168d85553d9b2d47a9',
  },
  name: 'ヒステリックナイトガール',
  duration: 220,
}

export const mockMusic: IMusicModel = new MusicModel(entity)
