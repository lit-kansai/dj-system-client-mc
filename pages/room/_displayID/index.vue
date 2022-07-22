<template>
  <div v-if="loading">
    <LoadingOverlay />
  </div>
  <div v-else class="h-full">
    <div
      class="flex flex-col items-center justify-center w-full max-w-sm m-auto h-5/6 md:max-w-7xl md:flex-row md:gap-x-10"
    >
      <div v-if="roomNotFound">
        <p>ルームが見つかりませんでした</p>
      </div>
      <template v-else>
        <RoomLogo v-bind="roomLogo" class="md:max-w-[500px]" />
        <TextInput
          v-model="textInput.text"
          v-bind="textInput"
          class="mt-5 md:max-w-lg"
          @update:text="updateSearchWord"
          @keypress.enter.native="submit"
        />
        <Button class="mt-5" text="検索する" @click.native="submit" />
      </template>
    </div>
    <Background />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useRoute,
  useRouter,
  onMounted,
  watch,
} from '@nuxtjs/composition-api'
import { RoomLogo } from '~/components/02-molecules/RoomLogo.vue'
import { FetchRoomOverviewRepository } from '~/core/02-repositories/fetchRoomOverview'
import { useFetchRoomOverview } from '~/core/03-composables/useFetchRoomOverview'
import { useTextField } from '~/core/03-composables/useTextField'

export default defineComponent({
  setup() {
    const {
      loading,
      fetchRoomOverviewResponse,
      roomNotFound,
      fetchRoomOverviewError,
      mounted,
    } = useFetchRoomOverview(new FetchRoomOverviewRepository())
    const displayID = computed(() => useRoute().value.params.displayID)
    const router = useRouter()
    const { text, textInput, updateSearchWord } = useTextField({
      type: 'text',
      placeholder: '曲名・アーティスト名を入力',
      spellcheck: false,
      autocomplete: 'off',
      isShowSearchIcon: false,
    })
    const roomLogo = ref<RoomLogo>({
      roomName: '',
      imageUrl: '',
    })
    const submit = () => {
      router.push({
        path: `/room/${displayID.value}/result`,
        query: { searchWord: text.value },
      })
    }
    watch(fetchRoomOverviewResponse, (value) => {
      if (value) {
        roomLogo.value.roomName = value.name
      }
    })
    watch(fetchRoomOverviewError, (error) =>
      alert(`ルームの取得に失敗しました。${JSON.stringify(error)}`)
    )
    onMounted(() => {
      mounted({ roomId: displayID.value })
    })
    return {
      loading,
      roomNotFound,
      roomLogo,
      submit,
      textInput,
      updateSearchWord,
    }
  },
})
</script>
