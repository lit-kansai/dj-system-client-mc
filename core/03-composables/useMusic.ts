import { Ref, ref } from '@vue/composition-api'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchMusicGateway } from '~/core/02-gateways/fetchMusic'

export const useFetchMusic = (gateway: IFetchMusicGateway) => {
  const musics: Ref<IMusicModel[]> = ref([])
  const fetchMusic = () => {
    gateway
      .fetch()
      .then((response: IMusicModel[]) =>
        response.map((music) => musics.value.push(music))
      )
  }

  return {
    musics,
    fetchMusic,
  }
}
