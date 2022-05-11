<template>
  <div class="h-4/5 flex justify-center items-center">
    <div class="w-full max-w-7xl flex justify-between items-center">
      <RoomLogo v-bind="roomLogo" class="w-[500px]" />
      <TextInput
        v-model="textInput.text"
        v-bind="textInput"
        class="w-[600px]"
        @update:text="updateSearchWord"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useRoute,
} from '@nuxtjs/composition-api'
import { TextInput } from '~/types/components/textInput'
import { RoomLogo } from '~/components/02-molecules/RoomLogo.vue'

export default defineComponent({
  layout: 'default',
  setup() {
    const route = useRoute()
    const id = computed(() => route.value.params.displayID)
    const roomLogo = ref<RoomLogo>({
      roomName: 'ルーム名',
      imageUrl: '',
    })
    const searchWord = ref('')
    const textInput = ref<TextInput>({
      text: searchWord,
      type: 'text',
      placeholder: '曲名・アーティスト名を入力',
      spellcheck: false,
      autocomplete: 'off',
    })
    const updateSearchWord = (val: string) => {
      searchWord.value = val
    }
    return { id, roomLogo, searchWord, textInput, updateSearchWord }
  },
})
</script>
