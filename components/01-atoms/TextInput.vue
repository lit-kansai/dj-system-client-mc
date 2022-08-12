<template>
  <div class="relative">
    <fa
      v-if="isShowSearchIcon"
      icon="search"
      class="absolute top-1/2 left-0 transform -translate-y-1/2 px-4"
    />
    <input
      v-model="textComputed"
      :type="type"
      :placeholder="placeholder"
      :spellcheck="spellcheck"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      class="w-full px-3 py-4 text-gray-200 bg-gray-800 border-2 rounded-lg appearance-none transition ease-in duration-100 border-neon-blue focus:shadow-text-input-neon-blue focus:outline-none"
      :class="isShowSearchIcon ? 'pl-11' : ''"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { TextInput } from '~/types/components/textInput'

export default defineComponent({
  props: {
    text: { type: String, required: true },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    spellcheck: { type: Boolean, default: false },
    autocomplete: { type: String, default: 'off' },
    autofocus: { type: Boolean, default: false },
    isShowSearchIcon: { type: Boolean, default: false },
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
