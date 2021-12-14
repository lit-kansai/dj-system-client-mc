<template>
  <div
    class="max-w-[200px] cursor-pointer relative border border-neon-green shadow-card-neon-green rounded-md"
  >
    <div
      class="hover:opacity-80 opacity-0 transition-opacity absolute h-full w-full rounded-md bg-gray-800 flex justify-center items-center"
    >
      <p class="text-9xl font-extralight">+</p>
    </div>
    <img
      class="rounded-md"
      :src="imageUrl"
      :alt="`${musicTitle} | ${artistName}`"
    />
    <div class="p-3 text-gray-100">
      <p class="text-xl truncate">{{ musicTitle }}</p>
      <p class="mt-1 text-base truncate">{{ artistName }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Card extends Vue {
  @Prop() private readonly musicTitle!: string
  @Prop() private readonly artistName!: string
  @Prop() private readonly imageUrl!: string
}
</script>
