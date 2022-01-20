<template>
  <div class="flex">
    <div class="min-h-screen p-8 mt-1 border-r-2 border-gray-700">
      <HeaderText text="DJ Gassi" />
      <TextInput
        v-model="textInput.text"
        v-bind="textInput"
        class="mt-3"
        @update:text="updateSearchWord"
      />
    </div>
    <Container class="m-8">
      <template #content>
        <div class="min-h-screen p-6 m-4 rounded-2xl">
          <div>
            <HeaderText text="RESULT" />
          </div>
          <div class="flex flex-wrap mx-4 mt-6 gap-6">
            <Card v-for="(card, index) in cards" v-bind="card" :key="index" />
          </div>
        </div>
      </template>
    </Container>
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
