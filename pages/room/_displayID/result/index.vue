<template>
  <div class="w-full max-w-sm m-auto mb-5 md:max-w-7xl md:flex md:gap-x-10">
    <Modal v-bind="modalState" @close="onCloseModal">
      <template #content>
        <div class="relative">
          <LoadingOverlay v-if="requestMusicLoading" />
          <MemberOtayori
            v-if="currentState === 'confirm'"
            :music="selectedMusic"
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
      <TextInput
        v-model="textInput.text"
        v-bind="textInput"
        @update:text="updateSearchWord"
        @keypress.enter.native="onPressEnter"
      />
      <div class="mt-6">
        <p class="text-xl">リクエストしたい曲を選択しよう！</p>
        <div class="grid place-items-center relative min-h-[300px]">
          <template v-if="fetchMusicsLoading">
            <Loading />
          </template>
          <template v-if="!fetchMusicsLoading && musics">
            <MemberMusicSelect class="mt-4" :musics="musics" />
          </template>
        </div>
      </div>
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
  provide,
} from '@nuxtjs/composition-api'
import { onMounted } from '@vue/composition-api'
import { FetchMusicsRepository } from '~/core/02-repositories/fetchMusics'
import { useFetchMusics } from '~/core/03-composables/useFetchMusics'
import { useTextFieldComponent } from '~/core/03-composables/useTextFieldComponent'
import { getQuery } from '~/utils/getQuery'
import {
  previousModalInjectionKey,
  selectMusicInjectionKey,
  submitMusicInjectionKey,
  useRequestMusicModal,
} from '~/core/03-composables/useRequestMusicModal'

export default defineComponent({
  setup() {
    const route = useRoute()
    const displayID = computed(() => route.value.params.displayID)
    const query = computed(() => getQuery(route.value.query.searchWord))
    const { searchWord, textInput, updateSearchWord } = useTextFieldComponent()
    const { musics, fetchMusics, fetchMusicsLoading } = useFetchMusics(
      new FetchMusicsRepository()
    )
    const {
      currentState,
      modalState,
      selectedMusic,
      selectMusic,
      onCloseModal,
      previousModal,
      setDisplayID,
      requestMusicLoading,
      requestMusicError,
      submitMusic,
    } = useRequestMusicModal()

    provide(selectMusicInjectionKey, selectMusic)
    provide(previousModalInjectionKey, previousModal)
    provide(submitMusicInjectionKey, submitMusic)

    const onPressEnter = () => {
      fetchMusics({
        roomId: displayID.value,
        q: searchWord.value,
      })
    }
    onMounted(() => {
      setDisplayID(displayID.value)
      updateSearchWord(query.value)
      fetchMusics({
        roomId: displayID.value,
        q: searchWord.value,
      })
    })
    watch(requestMusicError, (error) => {
      alert(`ルームの取得に失敗しました。${JSON.stringify(error)}`)
    })
    return {
      musics,
      requestMusicLoading,
      fetchMusicsLoading,
      modalState,
      currentState,
      onPressEnter,
      textInput,
      updateSearchWord,
      selectedMusic,
      onCloseModal,
    }
  },
})
</script>
