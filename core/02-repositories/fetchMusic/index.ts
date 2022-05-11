import { IMusicModel } from '~/core/01-models/music'
import { mockMusic } from '~/mock/music'
// import { $axios } from '~/utils/api'

export interface IFetchMusicRepository {
  fetch(): Promise<IMusicModel[]>
}

export class FetchMusicRepositoryImpl implements IFetchMusicRepository {
  fetch(): Promise<IMusicModel[]> {
    // debugger
    return new Promise((resolve) => {
      resolve([mockMusic, mockMusic, mockMusic])
    })
  }
}
