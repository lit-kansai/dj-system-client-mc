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
} from '@nuxtjs/composition-api'
import { UpdateRoomRepository } from '~/core/02-repositories/updateRoom'
import { useLoading } from '~/core/03-composables/useLoading'
import { useUpdateRoom } from '~/core/03-composables/userUpdateRoom'

interface State {
  id: number
  displayId: string
  name: string
  description: string
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const { response, error, updateRoom } = useUpdateRoom(
      new UpdateRoomRepository()
    )
    const { loading, setLoading } = useLoading()
    const state = toRefs(
      reactive<State>({
        id: -1,
        displayId: '',
        name: '',
        description: '',
      })
    )
    const route = useRoute()
    const displayId = computed(() => route.value.params.id)
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
        roomId: state.id.value,
        urlName: state.displayId.value,
        roomName: state.name.value,
        description: state.description.value,
      })
    }
    const cancel = () => {
      router.push(`/mc/${state.displayId.value}`)
    }
    watch(response, () => {
      setLoading(false)
      alert('Successfully created a room')
      router.push(`/mc/${state.displayId.value}`)
    })
    watch(error, () => {
      setLoading(false)
      alert('an error occurred')
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
