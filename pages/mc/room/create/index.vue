<template>
  <div class="w-full m-auto mb-5">
    <LoadingOverlay v-if="loading" />
    <p class="mb-5"><NuxtLink to="/mc">ホーム</NuxtLink> / ルーム作成</p>
    <Container>
      <template #content>
        <HeaderText text="Create Room" class="mb-5 md:mb-10" />
        <div
          class="items-center mb-8 grid grid-cols-1 md:grid-cols-title-and-content gap-2 md:gap-5 md:gap-y-8"
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
          <p>使用サービス*</p>
          <SelectInput
            v-model="musicProviderSelect.selected"
            v-bind="musicProviderSelect"
            @update:select="updateProvider"
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
          <Button text="ルームを作成する" @click.native="submit" />
        </div>
      </template>
    </Container>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  reactive,
  toRefs,
  useRouter,
  Ref,
} from '@nuxtjs/composition-api'
import { watch } from '@vue/composition-api'
import { SelectInput } from '~/components/01-atoms/SelectInput.vue'
import { CreateRoomRepository } from '~/core/02-repositories/createRoom'
import { useCreateRoom } from '~/core/03-composables/useCreateRoom'
import { useLoading } from '~/core/03-composables/useLoading'
import { ProviderName } from '~/types/data/providerName'

interface State {
  name: string
  description: string
  provider: ProviderName
  displayId: string
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const { response, error, createRoom } = useCreateRoom(
      new CreateRoomRepository()
    )
    const { loading, setLoading } = useLoading()
    const state = toRefs(
      reactive<State>({
        name: '',
        description: '',
        provider: '',
        displayId: '',
      })
    )
    const selectedMusicProvider: Ref<ProviderName> = ref('')
    const musicProviderSelect = ref<SelectInput>({
      selected: selectedMusicProvider,
      options: [
        { value: '', text: '選択しない' },
        { value: 'spotify', text: 'Spotify' },
      ],
    })
    const updateName = (name: string): void => {
      state.name.value = name
    }
    const updateDescription = (description: string): void => {
      state.description.value = description
    }
    const updateProvider = (provider: ProviderName): void => {
      state.provider.value = provider
    }
    const updateDisplayId = (displayId: string): void => {
      state.displayId.value = displayId
    }
    const submit = () => {
      setLoading(true)
      createRoom({
        urlName: state.displayId.value,
        roomName: state.name.value,
        description: state.description.value,
        provider: state.provider.value,
      })
    }
    const cancel = () => {
      router.push('/mc')
    }
    watch(response, () => {
      setLoading(false)
      alert('Successfully created a room')
      router.push('/mc')
    })
    watch(error, (error) => {
      setLoading(false)
      alert(`ルームの取得に失敗しました。${JSON.stringify(error)}`)
    })
    return {
      musicProviderSelect,
      loading,
      updateName,
      updateDescription,
      updateProvider,
      updateDisplayId,
      submit,
      cancel,
    }
  },
})
</script>
