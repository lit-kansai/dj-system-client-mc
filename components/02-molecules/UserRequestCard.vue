<template>
  <div
    class="w-full p-4 text-gray-200 border border-gray-400 rounded"
    @click="toggleOpened"
  >
    <div class="flex">
      <div class="flex-grow">
        <div class="flex">
          <p class="font-bold">{{ userName ? userName : '名前無し' }}</p>
          <p class="ml-2 text-gray-400">{{ date }}</p>
        </div>
        <div>
          <p>
            {{ body }}
          </p>
        </div>
      </div>
      <button class="flex items-center justify-center">
        <fa
          icon="chevron-right"
          class="transition rotate-90"
          :class="isOpened ? 'rotate-90' : 'rotate-0'"
        />
      </button>
    </div>
    <div v-if="isOpened" class="flex items-center mt-4 gap-2">
      <img :src="thumbnail" class="object-cover w-14 h-14" />
      <div>
        <p>{{ musicTitle }}</p>
        <p class="text-gray-400">{{ artists }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from '@vue/composition-api'
import { UserRequestCardProps } from '~/types/components/userRequestCard'

export default defineComponent({
  props: {
    card: { type: Object as PropType<UserRequestCardProps>, required: true },
  },
  setup(props) {
    const isOpened = ref(false)

    const toggleOpened = () => {
      isOpened.value = !isOpened.value
    }
    return {
      isOpened,
      toggleOpened,
      ...props.card,
    }
  },
})
</script>
