import { Context } from '@nuxt/types'
import {
  MEMBER_LAST_REQUESTED_TIME_LOCAL_STORAGE_KEY,
  MEMBER_REQUEST_ALLOW_INTERVAL_TIME_LOCAL_STORAGE_KEY,
  MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME,
} from '~/utils/constants'
import { $nuxt } from '~/utils/nuxtInstance'

export default function (context: Context) {
  const { route } = context
  const { path } = route

  if (isRequestResultPage(path)) {
    return onEnterMemberPage(path)
  }
}

const isRequestResultPage = (path: string): boolean => {
  const memberPageRegex = /^(\/room.*\/result)/
  return memberPageRegex.test(path)
}

const isAllowRequest = (): boolean => {
  const intervalSeconds = Number(
    localStorage.getItem(
      MEMBER_REQUEST_ALLOW_INTERVAL_TIME_LOCAL_STORAGE_KEY
    ) ?? MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME
  )
  const lastRequested = Date.parse(
    localStorage.getItem(MEMBER_LAST_REQUESTED_TIME_LOCAL_STORAGE_KEY) ?? ''
  )
  const allowRequest = lastRequested + intervalSeconds * 1000

  if (isNaN(lastRequested) || lastRequested <= allowRequest) {
    return true
  } else {
    return false
  }
}

const displayId = (path: string): string => {
  if (isRequestResultPage(path)) {
    const id = path.split('/')[2]
    return id
  }
  return ''
}

const onEnterMemberPage = (path: string) => {
  if (!isAllowRequest()) {
    const { redirect } = $nuxt
    redirect('/room/' + displayId(path))
  }
}
