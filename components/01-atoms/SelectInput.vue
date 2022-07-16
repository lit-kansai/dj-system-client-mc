<template>
  <select
    id="pet-select"
    v-model="selectComputed"
    name="pets"
    class="w-full px-3 py-4 text-gray-200 bg-gray-800 border-2 rounded-lg appearance-none transition ease-in duration-100 border-neon-blue focus:shadow-text-input-neon-blue focus:outline-none"
  >
    <option
      v-for="option in selectOptions"
      :key="option.value"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { Ref, defineComponent, computed } from '@nuxtjs/composition-api'
import { ProviderName } from '~/types/data/providerName'

export interface SelectInputOption {
  value: ProviderName
  text: string
}

export interface SelectInput {
  selected: Ref<ProviderName>
  options: Array<SelectInputOption>
}

export default defineComponent({
  props: {
    selected: { type: String, required: true },
    options: { type: Array, required: true },
  },
  emits: ['update:select'],
  setup(props: SelectInput, { emit }: any) {
    const selectComputed = computed({
      get: () => props.selected,
      set: (value) => {
        emit('update:select', value)
      },
    })
    const selectOptions = props.options
    return { selectComputed, selectOptions }
  },
})
</script>
