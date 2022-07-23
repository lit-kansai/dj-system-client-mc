import { ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IFetchUserProfileModel } from '../01-models/fetchUserProfile'
import { IFetchUserProfileRepository } from '../02-repositories/fetchUserProfile'

export const useFetchUserProfile = (
  repository: IFetchUserProfileRepository
) => {
  const fetchUserProfileResponse = ref<undefined | IFetchUserProfileModel>(
    undefined
  )
  const fetchUserProfileError = ref<undefined | AxiosError>(undefined)
  const fetchUserProfile = (): void => {
    repository
      .get()
      .then((res) => (fetchUserProfileResponse.value = res))
      .catch((err: AxiosError) => {
        fetchUserProfileError.value = err
      })
  }

  return {
    fetchUserProfileResponse,
    fetchUserProfileError,
    fetchUserProfile,
  }
}
