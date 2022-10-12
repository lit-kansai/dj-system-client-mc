<template>
  <div class="md:p-4">
    <div class="flex items-end mb-5 md:mb-10">
      <HeaderText text="OTAYORI" class="mt-2 mr-3 md:mt-0" />
      <p class="hidden md:block">MCに! お便り! 送れますよ!</p>
    </div>
    <div
      class="items-center mb-10 grid grid-cols-1 md:grid-cols-title-and-content gap-2 md:gap-x-5 md:gap-y-10"
    >
      <p>リクエスト曲</p>
      <RequestMusicOverview
        :props="requestMusicOverview"
        class="mb-5 border-neon-pink md:mb-0 shadow-card-neon-pink"
      />
      <p>ラジオネーム（任意）</p>
      <TextInput
        text=""
        class="mb-5 md:mb-0"
        placeholder="例)がっしー"
        @update:text="updateRadioName"
      />
      <p>お便り内容（任意）</p>
      <TextInput
        text=""
        placeholder="例)今日も一日がんばるぞ!"
        @update:text="updateMessage"
      />
    </div>
    <div class="flex justify-center mb-7 md:mb-1">
      <Button text="リクエストを送信" @click.native="submit" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  PropType,
  computed,
  ComputedRef,
} from '@nuxtjs/composition-api'
import { MusicOverview } from '~/types/components/music_overview'
import { IMusicModel } from '~/core/01-models/music'

interface State {
  radioName: string
  message: string
}

export default defineComponent({
  props: {
    music: {
      type: Object as PropType<IMusicModel>,
      required: true,
    },
  },
  emits: {
    // NOTE: never usedって怒られるので応急処置
    submitMusic: (music: IMusicModel, radioName: string, message: string) =>
      music && radioName && message,
  },
  setup(props, { emit }) {
    const state = toRefs(
      reactive<State>({
        radioName: '',
        message: '',
      })
    )
    const requestMusicOverview: ComputedRef<MusicOverview> = computed(() => {
      return {
        musicTitle: props.music.toMusicOverviewComponentProps.musicTitle,
        artistName: props.music.toMusicOverviewComponentProps.artistName,
        imageUrl: props.music.toMusicOverviewComponentProps.imageUrl,
      }
    })
    const updateRadioName = (radioName: string): void => {
      state.radioName.value = radioName
    }
    const updateMessage = (message: string): void => {
      state.message.value = message
    }
    const submit = () => {
      emit(
        'submitMusic',
        props.music,
        state.message.value,
        state.radioName.value
      )
    }
    return {
      state,
      requestMusicOverview,
      updateRadioName,
      updateMessage,
      submit,
    }
  },
})
</script>
