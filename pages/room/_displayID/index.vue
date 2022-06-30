<template>
  <div
    class="w-full h-5/6 max-w-sm md:max-w-7xl m-auto flex flex-col justify-center items-center md:flex-row md:gap-x-10"
  >
    <RoomLogo v-bind="roomLogo" class="md:max-w-[500px]" />
    <TextInput
      v-model="textInput.text"
      v-bind="textInput"
      class="mt-5 md:max-w-lg"
      @update:text="updateSearchWord"
    />
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
