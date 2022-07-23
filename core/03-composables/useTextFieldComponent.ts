import { ref } from '@nuxtjs/composition-api'
import { TextInput } from '~/types/components/textInput'
export const useTextFieldComponent = () => {
  const searchWord = ref('')
  const textInput = ref<TextInput>({
    text: searchWord,
    type: 'text',
    // placeholderになんか入れたいけど横幅足りなくてバグってるので、一旦保留で
    placeholder: '',
    spellcheck: false,
    autocomplete: 'off',
    isShowSearchIcon: true,
  })
  const updateSearchWord = (text: string) => {
    searchWord.value = text
  }
  return {
    searchWord,
    textInput,
    updateSearchWord,
  }
}
