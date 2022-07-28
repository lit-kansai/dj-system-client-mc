<template>
  <div class="w-full m-auto mb-5">
    <LoadingOverlay v-if="useRoomSettingsLoading" />
    <p class="mt-5 mb-5">
      <NuxtLink to="/mc">ホーム</NuxtLink> / {{ state.roomName.value }} / 設定
    </p>
    <Container>
      <template #content>
        <HeaderText text="Setting Room" class="mb-5 md:mb-10" />
        <div
          class="items-center mb-8 grid grid-cols-1 md:grid-cols-title-and-content gap-2 md:gap-5 md:gap-y-8"
        >
          <p>ルームネーム*</p>
          <TextInput
            :text="roomDetail.name"
            placeholder="例)がっしー"
            @update:text="updateRoomName"
          />
          <p>ルーム説明*</p>
          <TextInput
            :text="roomDetail.description"
            placeholder="例)2022年夏のイベント用"
            @update:text="updateDescription"
          />
          <p>リクエストURL*</p>
          <TextInput
            :text="roomDetail.displayId"
            placeholder="例)gassi"
            @update:text="updateUrlName"
          />
        </div>
        <div class="flex justify-center mb-3">
          <Button
            class="mr-3 bg-gray-400 hover:bg-gray-500"
            text="戻る"
            @click.native="cancel"
          />
          <Button text="保存する" @click.native="submit" />
        </div>
      </template>
    </Container>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useRoute,
  toRefs,
  reactive,
  useRouter,
  onMounted,
  watch,
} from '@nuxtjs/composition-api'
import { FetchRoomDetailRepository } from '~/core/02-repositories/fetchRoomDetail'
import { UpdateRoomRepository } from '~/core/02-repositories/updateRoom'
import { useRoomSettings } from '~/core/03-composables/useRoomSettings'

interface State {
  urlName: string
  roomName: string
  description: string
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const {
      useRoomSettingsLoading,
      updateRoomDetail,
      roomDetail,
      fetchRoomDetail,
      fetchRoomSettingsError,
    } = useRoomSettings(
      new FetchRoomDetailRepository(),
      new UpdateRoomRepository()
    )
    const state = toRefs(
      reactive<State>({
        urlName: '',
        roomName: '',
        description: '',
      })
    )
    const displayID = computed(() => route.value.params.displayID)
    const updateUrlName = (displayId: string): void => {
      state.urlName.value = displayId
    }
    const updateRoomName = (name: string): void => {
      state.roomName.value = name
    }
    const updateDescription = (description: string): void => {
      state.description.value = description
    }
    const submit = async () => {
      try {
        await updateRoomDetail({
          roomId: displayID.value,
          urlName: state.urlName.value,
          roomName: state.roomName.value,
          description: state.description.value,
        })
        alert('アップデート出来ました！')
        router.push(`/mc/room/${state.urlName.value}`)
      } catch (error) {}
    }
    const cancel = () => {
      router.push(`/mc/room/${displayID.value}`)
    }
    onMounted(async () => {
      try {
        await fetchRoomDetail({ roomId: displayID.value })
        updateUrlName(roomDetail.value.displayId)
        updateRoomName(roomDetail.value.name)
        updateDescription(roomDetail.value.description)
      } catch {}
    })

    watch(fetchRoomSettingsError, (error) => {
      alert(`ルームの取得に失敗しました。${JSON.stringify(error)}`)
    })

    return {
      state,
      roomDetail,
      updateUrlName,
      updateRoomName,
      updateDescription,
      submit,
      cancel,
      useRoomSettingsLoading,
    }
  },
})
</script>
