import { IMusicModel, MusicModel } from '~/core/01-models/music'
import { IFetchMusicsParams } from '~/types/params/fetchMusicsParams'
import { $axios } from '~/utils/api'

export interface IFetchMusicsRepository {
  fetch(params: IFetchMusicsParams): Promise<IMusicModel[]>
}

export class FetchMusicsRepository implements IFetchMusicsRepository {
  fetch(params: IFetchMusicsParams): Promise<IMusicModel[]> {
    const { roomId, q } = params
    const result = $axios
      .$get<IMusicModel[]>(`/room/${roomId}/music/search`, {
        params: {
          q,
        },
      })
      .then((musics) => {
        return musics.map((music) => new MusicModel(music))
      })
    return result
  }
}
