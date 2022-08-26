import { Context } from '@nuxt/types'
import { CamelToSnake } from '~/utils/camelToSnake'
import { initializeAxios } from '~/utils/api'
import { SnakeToCamel } from '~/utils/snakeToCamel'
import { useLocalStorageUserCredentials } from '~/core/03-composables/useLocalStorageUserCredentials'
import { UserCredentialsRepository } from '~/core/02-repositories/UserCredentials'
import { useUserCredentials } from '~/core/03-composables/useUserCredentials'

export default function ({ $axios, redirect }: Context) {
  $axios.onRequest(async (request) => {
    if (request.data && request.data?.convert) {
      const data = SnakeToCamel.convert(request.data)
      delete data.convert
      request.data = data
    }
    // TODO: 出来たらtokenが必要なエンドポイントだけ場合分けしてheaderに乗せたい
    const { fetch } = useLocalStorageUserCredentials(
      new UserCredentialsRepository()
    )
    const userInfo = await fetch()
    if (userInfo) {
      const { apiToken } = userInfo
      $axios.setHeader('api-token', apiToken)
    }
    $axios.setHeader('Content-Type', 'application/json')
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
      const { clearUserCredentials } = useUserCredentials()
      const ok = clearUserCredentials()
      if (!ok) {
        error.message += '\n can not clear user credentials in local storage'
      }
      redirect('/mc/login')
      throw error
    }
    throw error
  })
}
