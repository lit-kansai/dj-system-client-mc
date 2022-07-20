import { IMusicModel } from '~/core/01-models/music'
import { mockMusics } from '~/mock/music'
import { IFetchMusicParams } from '~/types/params/fetchMusicParams'
// import { $axios } from '~/utils/api'

export interface IFetchMusicRepository {
  fetch(params: IFetchMusicParams): Promise<IMusicModel[]>
}

export class FetchMusicRepository implements IFetchMusicRepository {
  fetch(params: IFetchMusicParams): Promise<IMusicModel[]> {
    console.log(params)
    // const { roomId, q } = params
    // $axios.$get(`/room/${roomId}/music/search`, {
    //   params: {
    //     q,
    //   },
    // })
    // debugger
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMusics())
        // resolve([])
      }, 500)
    })
  }
}
