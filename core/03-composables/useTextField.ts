import { ref } from '@nuxtjs/composition-api'
import { TextInput } from '~/types/components/textInput'

interface IUseTextField {
  type: string
  placeholder: string
  spellcheck: false
  autocomplete: string
}

export const useTextField = (props: IUseTextField) => {
  const text = ref('')
  const textInput = ref<TextInput>({
    text,
    ...props,
  })
  const updateSearchWord = (word: string) => {
    text.value = word
  }
  return {
    text,
    textInput,
    updateSearchWord,
  }
}
