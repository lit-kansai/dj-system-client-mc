<template>
  <div
    class="w-full max-w-sm md:max-w-7xl m-auto mt-5 mb-5 md:flex md:gap-x-10"
  >
    <div class="mb-5 md:w-60">
      <HeaderText text="DJ Gassi" class="hidden md:block" />
      <TextInput
        v-model="textInput.text"
        v-bind="textInput"
        class="md:mt-3"
        @update:text="updateSearchWord"
      />
    </div>
    <!-- class="p-5 md:p-10" -->
    <div class="md:w-full">
      <Container v-if="loading">
        <template #content>
          <Loading />
        </template>
      </Container>
      <template v-if="!loading">
        <Container>
          <template #content>
            <div class="p-2 md:p-5">
              <MemberMusicSelect
                v-if="currentState === 'musicSelect'"
                @musicSelected="musicSelected"
              />
              <MemberOtayori
                v-else-if="currentState === 'confirm'"
                :music="selectedMusic"
                @submit="onSubmit"
                @cancel="cancel"
              />
              <Complete
                v-else-if="currentState === 'finished'"
                title="送信完了"
                subtitle="流れるのをお楽しみに！！"
              />
            </div>
          </template>
        </Container>
      </template>
    </div>
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
