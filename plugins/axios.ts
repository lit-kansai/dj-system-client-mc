import { Context } from '@nuxt/types'
import { CamelToSnake } from '~/utils/camelToSnake'
import { initializeAxios } from '~/utils/api'
import { SnakeToCamel } from '~/utils/snakeToCamel'
import { LocalUserCredentialsRepository } from '~/core/02-repositories/localUserCredentials'
import { useLocalUserCredentials } from '~/core/03-composables/useLocalUserCredentials'

export default function ({ $axios, redirect }: Context) {
  $axios.onRequest((request) => {
    const API_TOKEN_HEADER = 'api-token'
    if (request.data && request.data?.convert) {
      const data = SnakeToCamel.convert(request.data)
      delete data.convert
      request.data = data
    }
    // TODO: 出来たらtokenが必要なエンドポイントだけ場合分けしてheaderに乗せたい
    const { fetch } = useLocalUserCredentials(
      new LocalUserCredentialsRepository()
    )
    const userInfo = fetch()
    if (!userInfo) {
      delete request.headers?.common[API_TOKEN_HEADER]
      return
    }
    const { apiToken } = userInfo
    request.headers.common[API_TOKEN_HEADER] = apiToken
    request.headers.common['Content-Type'] = 'application/json'
    return request
  })

  initializeAxios($axios)
  $axios.onResponse((response) => {
    response.data = CamelToSnake.convert(response.data)
    return response
  })

  $axios.onResponseError((error) => {
    // NOTE: 401エラーはトークンが期限切れした事を表しているので、ログアウトさせる
    if (error.response?.status === 401) {
      error.message =
        'ログインの有効期限が切れました。もう一度ログインし直してください'
      const { clear } = useLocalUserCredentials(
        new LocalUserCredentialsRepository()
      )
      const ok = clear()
      if (!ok) {
        error.message += '\n can not clear user credentials in local storage'
      }
      redirect('/mc/login')
      throw error
    }
    throw error
  })
}
