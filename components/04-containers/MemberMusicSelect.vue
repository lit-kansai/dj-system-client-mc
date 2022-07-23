<template>
  <div>
    <div v-if="!state.cards.value.length" class="w-full text-center">
      検索結果が見つかりませんでした
    </div>
    <div class="w-full grid gap-y-3 md:gap-6 md:grid-cols-6">
      <template v-if="state.cards.value">
        <div v-for="(card, index) in state.cards.value" :key="index">
          <Card
            :props="card"
            class="hidden md:block"
            @click.native="onClickCard(index)"
          />
          <RequestMusicOverview
            :props="card"
            class="w-screen md:hidden"
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
  inject,
} from '@nuxtjs/composition-api'
import { MusicOverview } from '~/types/components/music_overview'
import { IMusicModel } from '~/core/01-models/music'
import {
  SelectMusicType,
  selectMusicInjectionKey,
} from '~/core/03-composables/useRequestMusicModal'

interface State {
  cards: Array<MusicOverview>
}

export default defineComponent({
  props: {
    musics: { type: Array as PropType<IMusicModel[]>, required: true },
  },
  setup(props) {
    const selectMusic = inject(selectMusicInjectionKey) as SelectMusicType
    const state = toRefs(
      reactive<State>({
        cards: [],
      })
    )
    const onClickCard = (index: number): void => {
      selectMusic({ music: props.musics[index] })
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
