<template>
  <div class="w-full max-w-sm md:max-w-7xl m-auto mb-5">
    <LoadingOverlay v-if="loading" />
    <p class="mt-5 mb-5">ホーム / {{ state.name.value }} / 設定</p>
    <Container>
      <template #content>
        <HeaderText text="Setting Room" class="mb-5 md:mb-10" />
        <div
          class="mb-8 grid grid-cols-1 md:grid-cols-title-and-content items-center gap-2 md:gap-5 md:gap-y-8"
        >
          <p>ルームネーム*</p>
          <TextInput
            text=""
            placeholder="例)がっしー"
            @update:text="updateName"
          />
          <p>ルーム説明*</p>
          <TextInput
            text=""
            placeholder="例)2022年夏のイベント用"
            @update:text="updateDescription"
          />
          <p>リクエストURL*</p>
          <TextInput
            text=""
            placeholder="例)gassi"
            @update:text="updateDisplayId"
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
  watch,
  useRouter,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import { FetchRoomRepository } from '~/core/02-repositories/fetchRoom'
import { UpdateRoomRepository } from '~/core/02-repositories/updateRoom'
import { useFetchRoom } from '~/core/03-composables/useFetchRoom'
import { useLoading } from '~/core/03-composables/useLoading'
import { useUpdateRoom } from '~/core/03-composables/useUpdateRoom'

interface State {
  roomId: number | undefined
  displayId: string
  name: string
  description: string
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const { updateRoomResponse, updateRoomError, updateRoom } = useUpdateRoom(
      new UpdateRoomRepository()
    )
    const { fetchRoomResponse, fetchRoomError, fetchRoom } = useFetchRoom(
      new FetchRoomRepository()
    )
    const { loading, setLoading } = useLoading()
    const state = toRefs(
      reactive<State>({
        roomId: undefined,
        displayId: '',
        name: '',
        description: '',
      })
    )
    const route = useRoute()
    const displayId = computed(() => route.value.params.displayID)
    const updateName = (name: string): void => {
      state.name.value = name
    }
    const updateDescription = (description: string): void => {
      state.description.value = description
    }
    const updateDisplayId = (displayId: string): void => {
      state.displayId.value = displayId
    }
    const submit = () => {
      setLoading(true)
      updateRoom({
        roomId: state.roomId.value as number,
        urlName: state.displayId.value,
        roomName: state.name.value,
        description: state.description.value,
      })
    }
    const cancel = () => {
      router.push(`/mc/${state.displayId.value}`)
    }
    watch(updateRoomResponse, () => {
      setLoading(false)
      alert('Successfully created a room')
      router.push(`/mc/${state.displayId.value}`)
    })
    watch(updateRoomError, () => {
      setLoading(false)
      alert('an error occurred')
    })
    onBeforeMount(() => {
      setLoading(false)
      fetchRoom({ displayId: route.value.params.id })
    })
    watch(fetchRoomResponse, () => {
      setLoading(false)
      state.roomId.value = fetchRoomResponse.value?.id as number
      state.displayId.value = fetchRoomResponse.value?.displayId as string
      state.name.value = fetchRoomResponse.value?.name as string
      state.description.value = fetchRoomResponse.value?.description as string
    })
    watch(fetchRoomError, () => {
      setLoading(false)
      alert(`an error occurred: ${JSON.stringify(fetchRoomError.value)}`)
    })

    return {
      state,
      displayId,
      updateName,
      updateDescription,
      updateDisplayId,
      submit,
      cancel,
      loading,
    }
  },
})
</script>
