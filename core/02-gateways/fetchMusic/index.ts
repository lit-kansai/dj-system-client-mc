import { IMusicModel } from '~/core/01-models/music'
import { mockMusic } from '~/mock/music'
// import { $axios } from '~/utils/api'

export interface IFetchMusicGateway {
  fetch(): Promise<IMusicModel[]>
}

export class FetchMusicGateway implements IFetchMusicGateway {
  fetch(): Promise<IMusicModel[]> {
    // debugger
    return new Promise((resolve) => {
      resolve([mockMusic, mockMusic, mockMusic])
    })
  }
}
