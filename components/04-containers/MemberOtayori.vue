<template>
  <div>
    <div class="flex items-end mb-5 md:mb-10">
      <HeaderText text="OTAYORI" class="mr-3" />
      <p class="hidden md:block">MCに! お便り! 送れますよ!</p>
    </div>
    <div
      class="mb-10 grid grid-cols-1 md:grid-cols-title-and-content gap-2 md:gap-5"
    >
      <p>リクエスト曲</p>
      <RequestMusicOverview :props="requestMusicOverview" class="mb-5" />
      <p>ラジオネーム（任意）</p>
      <TextInput
        text=""
        class="mb-5"
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
    <div class="flex justify-center mb-1">
      <Button
        class="mr-3 bg-gray-400 hover:bg-gray-500"
        text="戻る"
        @click.native="cancel"
      />
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

export interface MemberOtayoriPayload {
  music: IMusicModel
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
    cancel() {
      return true
    },
    submit(payload: MemberOtayoriPayload) {
      return true || payload
    },
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
      const payload: MemberOtayoriPayload = {
        radioName: state.radioName.value,
        message: state.message.value,
        music: props.music,
      }
      emit('submit', payload)
    }
    const cancel = () => {
      emit('cancel')
    }
    return {
      state,
      requestMusicOverview,
      updateRadioName,
      updateMessage,
      submit,
      cancel,
    }
  },
})
</script>
