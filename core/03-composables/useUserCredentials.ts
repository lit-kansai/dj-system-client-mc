import { USER_CREDENTIALS_LOCAL_STORAGE_KEY } from '~/utils/constants'
export const useUserCredentials = () => {
  const hasUserCredentials = (): boolean => {
    if (localStorage.getItem(USER_CREDENTIALS_LOCAL_STORAGE_KEY)) {
      return true
    }
    return false
  }
  return {
    hasUserCredentials,
  }
}
