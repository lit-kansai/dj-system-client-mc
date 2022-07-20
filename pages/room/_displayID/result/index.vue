<template>
  <div class="w-full max-w-sm m-auto mb-5 md:max-w-7xl md:flex md:gap-x-10">
    <Modal v-bind="modalState" @close="onCloseModal">
      <template #content>
        <div class="relative p-2 md:p-5">
          <LoadingOverlay v-if="requestMusicLoading" />
          <MemberOtayori
            v-if="currentState === 'confirm'"
            :music="selectedMusic"
            @submit="onSubmit"
          />
          <Complete
            v-else-if="currentState === 'finished'"
            title="送信完了"
            subtitle="流れるのをお楽しみに！！"
          />
        </div>
      </template>
    </Modal>
    <div class="md:w-full">
      <template v-if="loading">
        <LoadingOverlay />
      </template>
      <template v-if="!loading">
        <TextInput
          v-model="textInput.text"
          v-bind="textInput"
          @update:text="updateSearchWord"
          @keypress.enter.native="onPressEnter"
        />
        <div class="mt-6">
          <p class="text-xl">リクエストしたい曲を選択しよう！</p>
          <MemberMusicSelect
            class="mt-4"
            :musics="displayMusics"
            @musicSelected="musicSelected"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  computed,
  useRoute,
  watch,
  Ref,
} from '@nuxtjs/composition-api'
import { onMounted } from '@vue/composition-api'
import {
  useModalState,
  useSelectedMusic,
} from '~/types/pages/room/_displayID/result/index'
import { MusicSelectedPayload } from '~/components/04-containers/MemberMusicSelect.vue'
import { MemberOtayoriPayload } from '~/components/04-containers/MemberOtayori.vue'
import {
  useRequestMusic,
  UseRequestMusicInputs,
} from '~/core/03-composables/useRequestMusic'
import { FetchMusicRepository } from '~/core/02-repositories/fetchMusic'
import { useFetchMusic } from '~/core/03-composables/useFetchMusic'
import { useTextFieldComponent } from '~/core/03-composables/useTextFieldComponent'
import { useLoading } from '~/core/03-composables/useLoading'
import { useModal } from '~/core/03-composables/useModal'
import { RequestMusicRepository } from '~/core/02-repositories/requestMusic'
import { getQuery } from '~/utils/getQuery'
import { IMusicModel } from '~/core/01-models/music'

export default defineComponent({
  setup() {
    const route = useRoute()
    const displayID = computed(() => route.value.params.displayID)
    const query = computed(() => route.value.query.searchWord)
    const { musics, fetchMusic } = useFetchMusic(new FetchMusicRepository())
    const displayMusics: Ref<IMusicModel[]> = ref([])
    const { searchWord, textInput, updateSearchWord } = useTextFieldComponent()
    const { currentState, nextModal, previousModal } = useModalState()
    const { modalState, openModal, closeModal } = useModal()
    const { loading, setLoading } = useLoading()
    const { loading: requestMusicLoading, setLoading: setRequestMusicLoading } =
      useLoading()
    const { selectedMusic, setSelectedMusic } = useSelectedMusic()
    const { requestMusicResult, requestMusic } = useRequestMusic(
      new RequestMusicRepository()
    )
    const musicSelected = (payload: MusicSelectedPayload) => {
      setSelectedMusic(payload.music)
      openModal()
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
      setRequestMusicLoading(true)
      requestMusic(inputs)
    }
    const onPressEnter = () => {
      setLoading(true)
      displayMusics.value = []
      searchMusic()
    }
    const searchMusic = () => {
      fetchMusic({
        roomId: displayID.value,
        q: searchWord.value,
      })
    }
    onMounted(() => {
      const q = getQuery(query.value)
      updateSearchWord(q)
      setLoading(true)
      searchMusic()
    })
    const onCloseModal = () => {
      closeModal()
      previousModal()
    }
    watch(musics, (_musics) => {
      displayMusics.value = musics.value
      setLoading(false)
    })
    watch(requestMusicResult, () => {
      setRequestMusicLoading(false)
      nextModal()
    })
    return {
      modalState,
      requestMusicLoading,
      currentState,
      displayMusics,
      loading,
      selectedMusic,
      onPressEnter,
      textInput,
      updateSearchWord,
      musicSelected,
      onSubmit,
      onCloseModal,
    }
  },
})
</script>
