import {
  MEMBER_LAST_REQUESTED_TIME_LOCAL_STORAGE_KEY,
  MEMBER_REQUEST_ALLOW_INTERVAL_TIME_LOCAL_STORAGE_KEY,
  MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME,
} from '~/utils/constants'

export const useRequestTimer = () => {
  const saveRequestedTime = () => {
    localStorage.setItem(
      MEMBER_LAST_REQUESTED_TIME_LOCAL_STORAGE_KEY,
      String(new Date().getTime())
    )
  }

  const waitingTime = (): number => {
    const now = new Date().getTime()
    return (allowRequestTime() - now) / 1000
  }

  const lastRequestedTime = (): number => {
    return Number(
      localStorage.getItem(MEMBER_LAST_REQUESTED_TIME_LOCAL_STORAGE_KEY) ?? ''
    )
  }

  const allowRequestTime = (): number => {
    const intervalSeconds = Number(
      localStorage.getItem(
        MEMBER_REQUEST_ALLOW_INTERVAL_TIME_LOCAL_STORAGE_KEY
      ) ?? MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME
    )
    return lastRequestedTime() + intervalSeconds * 1000
  }

  return {
    saveRequestedTime,
    allowRequestTime,
    waitingTime,
    lastRequestedTime,
  }
}
