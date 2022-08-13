import { Context } from '@nuxt/types'
import { useRequestTimer } from '~/core/03-composables/useRequestTimer'
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
  const { allowRequestTime, lastRequestedTime } = useRequestTimer()
  const now = new Date().getTime()

  if (lastRequestedTime() === 0 || now > allowRequestTime()) {
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
