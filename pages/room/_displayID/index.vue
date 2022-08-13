<template>
  <div v-if="loading">
    <LoadingOverlay />
  </div>
  <div v-else class="h-full">
    <div
      class="flex flex-col items-center justify-center w-full m-auto h-5/6 md:flex-row md:gap-x-10"
    >
      <div v-if="roomNotFound">
        <p>ルームが見つかりませんでした</p>
      </div>
      <div v-else-if="!allowTap">
        <p class="mb-3">次のリクエストまでちょっと待ってね！</p>
        <div class="flex justify-between">
          <CountDown time="00" text="HOURS" />
          <CountDown time="09" text="MINUTES" />
          <CountDown time="13" text="SECONDS" />
        </div>
      </div>
      <template v-else>
        <RoomLogo v-bind="roomLogo" class="md:max-w-[500px]" />
        <div class="flex w-full mt-7 max-w-lg">
          <TextInput
            v-model="textInput.text"
            v-bind="textInput"
            class="w-full md:max-w-lg"
            @update:text="updateSearchWord"
            @keypress.enter.native="submit"
          />
          <Button class="ml-1.5" type="search" @click.native="submit" />
        </div>
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
      autofocus: true,
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
    const allowTap = false
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
      allowTap,
    }
  },
})
</script>
