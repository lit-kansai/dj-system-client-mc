import { Context } from '@nuxt/types'
import { CamelConverter } from '~/utils/camelToSnake'
import { initializeAxios } from '~/utils/api'
import { SnakeConverter } from '~/utils/snakeToCamel'
import { useLocalStorageUserCredentials } from '~/core/03-composables/useLocalStorageUserCredentials'
import { UserCredentialsRepository } from '~/core/02-repositories/UserCredentials'

export default function ({ $axios }: Context) {
  $axios.onRequest(async (request) => {
    if (request.data && request.data?.convert) {
      const data = SnakeConverter.convert(request.data)
      delete data.convert
      request.data = data
    }
    // TODO: 出来たらtokenが必要なエンドポイントだけ場合分けしてheaderに乗せたい
    const { fetch } = useLocalStorageUserCredentials(
      new UserCredentialsRepository()
    )
    const { apiToken } = await fetch()
    $axios.setHeader('api-token', apiToken)
    $axios.setHeader('Content-Type', 'application/json')
    return request
  })

  initializeAxios($axios)
  $axios.onResponse((response) => {
    response.data = CamelConverter.convert(response.data)
    return response
  })
}
