import { IMusicEntity, IMusicModel, MusicModel } from '~/core/01-models/music'
import { IFetchRoomPlaylistParams } from '~/types/params/fetchRoomPlaylistParams'
import { $axios } from '~/utils/api'

export interface IFetchRoomPlaylistRepository {
  get(params: IFetchRoomPlaylistParams): Promise<IMusicModel[]>
}

export class FetchRoomPlaylistRepository
  implements IFetchRoomPlaylistRepository
{
  async get(params: IFetchRoomPlaylistParams): Promise<IMusicModel[]> {
    const result = await $axios
      .$get<IMusicEntity[]>(`/mc/room/${params.roomId}/playlist`)
      .then((musics) => musics.map((music) => new MusicModel(music)))
    return result
  }
}
