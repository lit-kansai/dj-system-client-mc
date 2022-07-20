import { UseRequestMusicInputs } from '~/core/03-composables/useRequestMusic'

export interface IRequestMusicRepository {
  post(params: UseRequestMusicInputs): Promise<string>
}

export class RequestMusicRepository implements IRequestMusicRepository {
  post(params: UseRequestMusicInputs): Promise<string> {
    return new Promise((resolve) => {
      console.log(params)
      setTimeout(() => {
        resolve(`success: ${Date.now()}`)
      }, 500)
    })
  }
}
