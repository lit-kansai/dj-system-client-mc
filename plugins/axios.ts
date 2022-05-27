import { Context } from '@nuxt/types'
import { CamelConverter } from '~/utils/camelToSnake'
import { initializeAxios } from '~/utils/api'
import { SnakeConverter } from '~/utils/snakeToCamel'

export default function ({ $axios }: Context) {
  $axios.onRequest((request) => {
    if (request.data && request.data?.convert) {
      const data = SnakeConverter.convert(request.data)
      delete data.convert
      return data
    }
  })

  initializeAxios($axios)
  $axios.onResponse((response) => {
    response.data = CamelConverter.convert(response.data)
    return response
  })
}
