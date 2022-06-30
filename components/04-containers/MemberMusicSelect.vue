<template>
  <div>
    <HeaderText text="RESULT" class="mb-6" />
    <div class="flex flex-wrap gap-6">
      <Card
        v-for="(card, index) in state.cards.value"
        :key="index"
        :props="card"
        @click.native="onClickCard(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  watch,
  onMounted,
} from '@nuxtjs/composition-api'
import { MusicOverview } from '~/types/components/music_overview'
import { FetchMusicRepositoryImpl } from '~/core/02-repositories/fetchMusic'
import { useFetchMusic } from '~/core/03-composables/useMusic'
import { IMusicModel } from '~/core/01-models/music'

const { musics, fetchMusic } = useFetchMusic(new FetchMusicRepositoryImpl())
interface State {
  cards: Array<MusicOverview>
}

export interface MusicSelectedPayload {
  music: IMusicModel
}
export default defineComponent({
  emits: {
    musicSelcted(payload: MusicSelectedPayload) {
      return true || payload
    },
  },
  setup(_, { emit }) {
    const state = toRefs(
      reactive<State>({
        cards: [],
      })
    )
    watch(musics, (_) => {
      musics.value.map((music) =>
        state.cards.value.push(music.toMusicOverviewComponentProps)
      )
    })
    const onClickCard = (index: number): void => {
      const payload: MusicSelectedPayload = {
        music: musics.value[index],
      }
      emit('musicSelected', payload)
    }
    onMounted(() => {
      if (!musics.value.length) {
        fetchMusic()
      }

      if (musics.value.length) {
        musics.value.map((music) =>
          state.cards.value.push(music.toMusicOverviewComponentProps)
        )
      }
    })
    return { state, onClickCard }
  },
})
</script>
