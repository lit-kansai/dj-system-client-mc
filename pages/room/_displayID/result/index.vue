<template>
  <div class="flex h-[calc(100%-84px)]">
    <div class="p-8 mt-1 border-r-2 border-gray-700">
      <HeaderText text="DJ Gassi" />
      <TextInput
        v-model="textInput.text"
        v-bind="textInput"
        class="mt-3"
        @update:text="updateSearchWord"
      />
    </div>
    <div
      class="w-full h-full p-5 m-16 border-2 border-neon-blue shadow-modal-neon-blue rounded-2xl"
    >
      <div
        class="min-h-full bg-gray-800 border-2 border-neon-pink shadow-modal-neon-pink rounded-2xl"
      >
        <div class="p-6 rounded-2xl">
          <div>
            <HeaderText text="RESULT" />
          </div>
          <div class="flex flex-wrap mx-4 mt-6 gap-6">
            <Card v-for="(card, index) in cards" v-bind="card" :key="index" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  ComputedRef,
  computed,
  useRoute,
  onMounted,
} from '@nuxtjs/composition-api'
import { FetchMusicGateway } from '~/core/02-gateways/fetchMusic'
import { useFetchMusic } from '~/core/03-composables/useMusic'
import { TextInput } from '~/types/components/textInput'
import { Card } from '~/types/components/card'

export default defineComponent({
  setup() {
    const route = useRoute()
    const id = computed(() => route.value.params.displayID)
    const { searchWord, textInput, updateSearchWord } = useComponents()
    const { musics, fetchMusic } = useFetchMusic(new FetchMusicGateway())

    const cards: ComputedRef<Card[]> = computed(() =>
      musics.value.map((music) => music.toCardComponentProps)
    )

    onMounted(() => {
      fetchMusic()
    })

    return {
      cards,
      searchWord,
      textInput,
      updateSearchWord,
      id,
    }
  },
})

const useComponents = () => {
  const searchWord = ref('')
  const textInput = ref<TextInput>({
    text: searchWord,
    type: 'text',
    // placeholderになんか入れたいけど横幅足りなくてバグってるので、一旦保留で
    placeholder: '',
    spellcheck: false,
    autocomplete: 'off',
  })
  const updateSearchWord = (val: string) => {
    searchWord.value = val
  }
  return {
    searchWord,
    textInput,
    updateSearchWord,
  }
}
</script>
