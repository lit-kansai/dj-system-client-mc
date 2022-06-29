<template>
  <div class="flex">
    <div class="min-h-screen p-8 mt-1 border-r-2 border-gray-700">
      <HeaderText text="DJ Gassi" />
      <TextInput
        v-model="textInput.text"
        v-bind="textInput"
        class="mt-3"
        @update:text="updateSearchWord"
      />
    </div>
    <Container v-if="loading">
      <template #content>
        <Loading />
      </template>
    </Container>
    <template v-if="!loading">
      <Container v-if="currentState === 'musicSelect'">
        <template #content>
          <MemberMusicSelect @musicSelected="musicSelected" />
        </template>
      </Container>
      <Container v-if="currentState === 'confirm'">
        <template #content>
          <MemberOtayori
            :music="selectedMusic"
            @submit="onSubmit"
            @cancel="cancel"
          />
        </template>
      </Container>
      <Container v-if="currentState === 'finished'">
        <template #content>
          <Complete title="送信完了" subtitle="流れるのをお楽しみに！！" />
        </template>
      </Container>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import {
  useModal,
  useSelectedMusic,
} from '~/types/pages/room/_displayID/result/index'
import { MusicSelectedPayload } from '~/components/04-containers/MemberMusicSelect.vue'
import { MemberOtayoriPayload } from '~/components/04-containers/MemberOtayori.vue'
import {
  useRequestMusic,
  UseRequestMusicInputs,
} from '~/core/03-composables/useRequestMusic'
import { useTextFieldComponent } from '~/core/03-composables/useTextFieldComponent'
import { useLoading } from '~/core/03-composables/useLoading'
import { RequestMusicRepository } from '~/core/02-repositories/requestMusic'

export default defineComponent({
  setup() {
    const route = useRoute()
    const displayID = computed(() => route.value.params.displayID)
    const { searchWord, textInput, updateSearchWord } = useTextFieldComponent()
    const { loading, setLoading } = useLoading()
    const { selectedMusic, setSelectedMusic } = useSelectedMusic()
    const { currentState, nextModal, previousModal } = useModal()
    const { requestMusicResult, requestMusic } = useRequestMusic(
      new RequestMusicRepository()
    )
    const musicSelected = (payload: MusicSelectedPayload) => {
      setSelectedMusic(payload.music)
      nextModal()
    }
    const cancel = () => {
      previousModal()
    }
    const onSubmit = (payload: MemberOtayoriPayload) => {
      const inputs: UseRequestMusicInputs = {
        params: {
          musics: [payload.music.id],
          radioName: payload.radioName,
          message: payload.message,
        },
        roomId: displayID.value,
      }
      nextModal()
      setLoading(true)
      requestMusic(inputs)
    }

    watch(requestMusicResult, () => {
      setLoading(false)
    })

    return {
      loading,
      selectedMusic,
      searchWord,
      textInput,
      updateSearchWord,
      musicSelected,
      currentState,
      onSubmit,
      cancel,
    }
  },
})
</script>
