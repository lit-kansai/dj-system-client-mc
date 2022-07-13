<template>
  <div class="w-full max-w-sm md:max-w-7xl m-auto mb-5">
    <p class="mt-5 mb-5">ホーム / {{ room.name }} / 設定</p>
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
          <Button text="ルームを作成する" />
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
} from '@nuxtjs/composition-api'
import { Room } from '~/pages/mc/index.vue'

export default defineComponent({
  setup() {
    const room = toRefs(
      reactive<Room>({
        name: '',
        description: '',
        displayId: '',
        type: '',
        playlistId: '',
      })
    )
    const route = useRoute()
    const id = computed(() => route.value.params.id)
    const updateName = (name: string): void => {
      room.name.value = name
    }
    const updateDescription = (description: string): void => {
      room.description.value = description
    }
    const updateDisplayId = (displayId: string): void => {
      room.displayId.value = displayId
    }
    return {
      room,
      id,
      updateName,
      updateDescription,
      updateDisplayId,
    }
  },
})
</script>
