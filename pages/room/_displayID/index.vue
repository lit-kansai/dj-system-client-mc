<template>
  <div
    class="flex flex-col items-center justify-center w-full max-w-sm m-auto h-5/6 md:max-w-7xl md:flex-row md:gap-x-10"
  >
    <RoomLogo v-bind="roomLogo" class="md:max-w-[500px]" />
    <TextInput
      v-model="textInput.text"
      v-bind="textInput"
      class="mt-5 md:max-w-lg"
      @update:text="updateSearchWord"
      @keypress.enter.native="submit"
    />
    <Button class="mt-5" text="検索する" @click.native="submit" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { TextInput } from '~/types/components/textInput'
import { RoomLogo } from '~/components/02-molecules/RoomLogo.vue'

export default defineComponent({
  layout: 'default',
  setup() {
    const route = useRoute()
    const router = useRouter()
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
    const updateSearchWord = (word: string) => {
      searchWord.value = word
    }
    const submit = () => {
      router.push({
        path: `/room/${id.value}/result`,
        query: { searchWord: searchWord.value },
      })
    }
    return { id, roomLogo, searchWord, submit, textInput, updateSearchWord }
  },
})
</script>
