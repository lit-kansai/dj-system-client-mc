<template>
  <div class="w-full max-w-sm md:max-w-7xl m-auto mb-5">
    <p class="mt-5 mb-5">ホーム / ルーム作成</p>
    <Container>
      <template #content>
        <HeaderText text="Create Room" class="mr-3 mb-10" />
        <div
          class="mb-3 grid grid-cols-1 md:grid-cols-title-and-content gap-2 md:gap-5"
        >
          <p>ルームネーム*</p>
          <TextInput
            text=""
            class="mb-5"
            placeholder="例)がっしー"
            @update:text="updateName"
          />
          <p>ルーム説明*</p>
          <TextInput
            text=""
            class="mb-5"
            placeholder="例)2022年夏のイベント用"
            @update:text="updateDescription"
          />
          <p>使用サービス*</p>
          <SelectInput
            v-model="musicServiceSelect.selected"
            v-bind="musicServiceSelect"
            class="mb-5"
          />
          <p>リクエストURL*</p>
          <TextInput
            text=""
            class="mb-5"
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
  computed,
  useRoute,
  ref,
  defineComponent,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'
import { SelectInput } from '~/components/01-atoms/SelectInput.vue'

interface State {
  name: string
  description: string
  service: string
  displayId: string
}

export default defineComponent({
  setup() {
    const state = toRefs(
      reactive<State>({
        name: '',
        description: '',
        service: '',
        displayId: '',
      })
    )
    const selectedMusicService = ref('')
    const musicServiceSelect = ref<SelectInput>({
      selected: selectedMusicService,
      options: [
        { value: 'applemusic', text: 'AppleMusic' },
        { value: 'spotify', text: 'Spotify' },
      ],
    })
    const updateName = (name: string): void => {
      state.name.value = name
    }
    const updateDescription = (description: string): void => {
      state.description.value = description
    }
    const updateService = (service: string): void => {
      state.service.value = service
    }
    const updateDisplayId = (displayId: string): void => {
      state.displayId.value = displayId
    }
    const route = useRoute()
    const id = computed(() => route.value.params.id)
    return {
      state,
      musicServiceSelect,
      id,
      updateName,
      updateDescription,
      updateService,
      updateDisplayId,
    }
  },
})
</script>
