<template>
  <input
    v-model="textComputed"
    :type="type"
    :placeholder="placeholder"
    :spellcheck="spellcheck"
    :autocomplete="autocomplete"
    class="transition ease-in duration-100 text-gray-200 appearance-none w-full bg-gray-800 py-4 px-3 rounded-lg border-neon-blue border-2 focus:shadow-text-input-neon-blue focus:outline-none"
  />
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from '@vue/composition-api'

export interface TextInput {
  text: Ref<string>
  type: string
  placeholder: string
  spellcheck: boolean
  autocomplete: string
}

export default defineComponent({
  props: {
    text: { type: String, required: true },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    spellcheck: { type: Boolean, default: false },
    autocomplete: { type: String, default: 'off' },
  },
  emits: ['update:text'],
  setup(props: TextInput, { emit }: any) {
    const textComputed = computed({
      get: () => props.text,
      set: (value) => {
        emit('update:text', value)
      },
    })

    return {
      textComputed,
    }
  },
})
</script>
