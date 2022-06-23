<template>
  <div class="w-full max-w-sm md:max-w-7xl m-auto">
    <p class="mt-5 mb-5">
      <NuxtLink to="/mc">ホーム</NuxtLink> / {{ room.name }}
    </p>
    <!-- Details -->
    <Container>
      <template #content>
        <div class="flex items-end gap-x-3">
          <HeaderText v-bind="detailTitle" />
          <NuxtLink
            :to="`/mc/room/${room.displayId}/settings`"
            class="text-yellow"
          >
            &gt;&gt; ルームを編集する
          </NuxtLink>
        </div>
        <ul class="mt-3 mb-3">
          <li>ルームネーム: {{ room.name }}</li>
          <li>ルーム説明: {{ room.description }}</li>
          <li>使用サービス: {{ room.type }}</li>
          <li>
            ルームURL:
            <NuxtLink :to="`/room/${room.displayId}`">{{
              protocolAndHostname + '/room/' + room.displayId
            }}</NuxtLink>
          </li>
        </ul>
      </template>
    </Container>
    <!-- Request -->
    <Container>
      <template #content> <HeaderText v-bind="requestTitle" /></template>
    </Container>
    <!-- Message -->
    <Container>
      <template #content> <HeaderText v-bind="messageTitle" /></template>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { computed, useRoute } from '@nuxtjs/composition-api'
import { Room } from '~/pages/mc/index.vue'
import { HeaderText } from '~/components/01-atoms/HeaderText.vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const protocolAndHostname = computed(
      () => window.location.protocol + '//' + window.location.hostname
    )
    const id = computed(() => route.value.params.id)
    const room = ref<Room>({
      name: 'DJさわっくま',
      description: 'B日程用',
      displayId: 'dj-sawa-kuma',
      type: 'applemusic',
    })
    const detailTitle = ref<HeaderText>({
      text: 'Detail',
    })
    const requestTitle = ref<HeaderText>({
      text: 'Request',
    })
    const messageTitle = ref<HeaderText>({
      text: 'Message',
    })
    return {
      id,
      protocolAndHostname,
      room,
      detailTitle,
      requestTitle,
      messageTitle,
    }
  },
})
</script>
