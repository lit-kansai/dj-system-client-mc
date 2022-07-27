<template>
  <div class="md:p-4 flex items-center justify-center">
    <div>
      <img src="~assets/img/default_room_logo.png" class="md:h-80 m-auto" />
      <h1
        class="text-neon-pink drop-shadow-neon-pink text-4xl mb-3 text-center"
      >
        {{ title }}
      </h1>
      <p v-if="subtitle != ''" class="text-center">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
  },
  setup() {},
})
</script>
