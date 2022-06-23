import { ref } from '@nuxtjs/composition-api'

export const useLoading = () => {
  const loading = ref(false)
  const setLoading = (payload: boolean) => {
    loading.value = payload
  }

  return { loading, setLoading }
}
