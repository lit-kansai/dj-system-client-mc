import { UseRequestMusicInputs } from '~/core/03-composables/useRequestMusic'
import { $axios } from '~/utils/api'

export interface IRequestMusicRepository {
  post(inputs: UseRequestMusicInputs): Promise<{ ok: boolean }>
}

export class RequestMusicRepository implements IRequestMusicRepository {
  post(inputs: UseRequestMusicInputs): Promise<{ ok: boolean }> {
    const { roomId, params } = inputs
    return $axios.$post(`/room/${roomId}/request`, {
      ...params,
      convert: true,
    })
  }
}
