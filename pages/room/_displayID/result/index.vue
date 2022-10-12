<template>
  <div class="mb-5">
    <Modal v-bind="modalState" @close="onCloseModal">
      <template #content>
        <LoadingOverlay v-if="requestMusicLoading" />
        <MemberOtayori
          v-if="currentModal === 'confirm'"
          :music="selectedMusic"
          @submitMusic="submitMusic"
        />
        <Complete
          v-else-if="currentModal === 'finished'"
          title="送信完了"
          subtitle="流れるのをお楽しみに！！"
        />
      </template>
    </Modal>
    <TextInput
      v-model="textInput.text"
      v-bind="textInput"
      @update:text="updateSearchWord"
      @keypress.enter.native="onPressEnter"
    />
    <div class="mt-6">
      <template v-if="fetchMusicsLoading">
        <div class="flex justify-center">
          <Loading />
        </div>
      </template>
      <template v-if="!fetchMusicsLoading && musics">
        <MemberMusicSelect
          class="mt-4"
          :musics="musics"
          @selectMusic="selectMusic"
        />
      </template>
    </div>
    <Background />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import { onMounted } from '@vue/composition-api'
import { FetchMusicsRepository } from '~/core/02-repositories/fetchMusics'
import { RequestMusicRepository } from '~/core/02-repositories/requestMusic'
import { useFetchMusics } from '~/core/03-composables/useFetchMusics'
import { useTextFieldComponent } from '~/core/03-composables/useTextFieldComponent'
import { useSelectedMusic } from '~/core/03-composables/useSelectedMusic'
import { useRequestMusicModalState } from '~/core/03-composables/useRequestMusicModalState'
import { useRequestMusic } from '~/core/03-composables/useRequestMusic'
import { useModal } from '~/core/03-composables/useModal'
import { getQuery } from '~/utils/getQuery'
import { sharedUseUrlParams } from '~/core/03-composables/useUrlParams'
import { IMusicModel } from '~/core/01-models/music'
import { DISPLAY_ID_KEY } from '~/types/data/urlParamsKey'

export default defineComponent({
  setup() {
    const route = useRoute()
    const displayID = sharedUseUrlParams.getParams(DISPLAY_ID_KEY)
    const query = computed(() => getQuery(route.value.query.searchWord))
    const { searchWord, textInput, updateSearchWord } = useTextFieldComponent()
    const { musics, fetchMusics, fetchMusicsLoading } = useFetchMusics(
      new FetchMusicsRepository()
    )
    const { selectedMusic, setSelectedMusic } = useSelectedMusic()
    const { currentModal, nextModal, previousModal } =
      useRequestMusicModalState()
    const { modalState, openModal, closeModal } = useModal()
    const { requestMusicError, requestMusic, requestMusicLoading } =
      useRequestMusic(new RequestMusicRepository())

    const onPressEnter = () => {
      fetchMusics(searchWord.value, displayID)
    }

    const submitMusic = async (
      music: IMusicModel,
      radioName: string,
      message: string
    ) => {
      await requestMusic(music, radioName, message, displayID)
      nextModal()
    }

    const onCloseModal = () => {
      closeModal()
      previousModal()
    }

    const selectMusic = (music: IMusicModel) => {
      setSelectedMusic(music)
      openModal()
    }

    watch(requestMusicError, (error) => {
      alert(`ルームの取得に失敗しました。${JSON.stringify(error)}`)
    })

    onMounted(() => {
      updateSearchWord(query.value)
      fetchMusics(searchWord.value, displayID)
    })

    return {
      musics,
      requestMusicLoading,
      fetchMusicsLoading,
      modalState,
      currentModal,
      onPressEnter,
      submitMusic,
      selectMusic,
      textInput,
      updateSearchWord,
      selectedMusic,
      onCloseModal,
    }
  },
})
</script>
