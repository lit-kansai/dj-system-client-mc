import { UseRequestMusicInputs } from '~/core/03-composables/useRequestMusic'

export interface IRequestMusicRepository {
  post(params: UseRequestMusicInputs): Promise<string>
}

export class RequestMusicRepository implements IRequestMusicRepository {
  post(params: UseRequestMusicInputs): Promise<string> {
    console.log(params)
    return new Promise((resolve) => {
      resolve('success')
    })
  }
}
