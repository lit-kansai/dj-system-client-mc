import { Ref } from '@nuxtjs/composition-api'

export interface TextInput {
  text: Ref<string>
  type: string
  placeholder: string
  spellcheck: boolean
  autocomplete: string
}
