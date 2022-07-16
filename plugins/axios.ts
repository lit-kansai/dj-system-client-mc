import { Context } from '@nuxt/types'
import { CamelToSnake } from '~/utils/camelToSnake'
import { initializeAxios } from '~/utils/api'
import { SnakeToCamel } from '~/utils/snakeToCamel'
import { useLocalStorageUserCredentials } from '~/core/03-composables/useLocalStorageUserCredentials'
import { UserCredentialsRepository } from '~/core/02-repositories/UserCredentials'

export default function ({ $axios }: Context) {
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
    throw error
  })
}
