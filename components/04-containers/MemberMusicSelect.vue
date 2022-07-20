<template>
  <div>
    <div class="w-full grid gap-y-3 md:gap-6 md:grid-cols-6">
      <div v-if="!state.cards.value.length" class="w-full text-center">
        検索結果が見つかりませんでした
      </div>
      <template v-if="state.cards.value">
        <div v-for="(card, index) in state.cards.value" :key="index">
          <Card
            :props="card"
            class="hidden md:block"
            @click.native="onClickCard(index)"
          />
          <RequestMusicOverview
            :props="card"
            class="w-full md:hidden"
            @click.native="onClickCard(index)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  PropType,
} from '@nuxtjs/composition-api'
import { MusicOverview } from '~/types/components/music_overview'
import { IMusicModel } from '~/core/01-models/music'

interface State {
  cards: Array<MusicOverview>
}

export interface MusicSelectedPayload {
  music: IMusicModel
}
export default defineComponent({
  props: {
    musics: { type: Array as PropType<IMusicModel[]>, required: true },
  },
  emits: {
    musicSelcted(payload: MusicSelectedPayload) {
      return true || payload
    },
  },
  setup(props, { emit }) {
    const state = toRefs(
      reactive<State>({
        cards: [],
      })
    )
    const onClickCard = (index: number): void => {
      const payload: MusicSelectedPayload = {
        music: props.musics[index],
      }
      emit('musicSelected', payload)
    }
    onMounted(() => {
      props.musics.map((music) =>
        state.cards.value.push(music.toMusicOverviewComponentProps)
      )
    })
    return { state, onClickCard }
  },
})
</script>
