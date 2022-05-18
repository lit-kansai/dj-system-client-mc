import { Context } from '@nuxt/types'
// import { SnakeConverter } from '~/utils/snakeToCamel'
import { CamelConverter } from '~/utils/camelToSnake'
import { initializeAxios } from '~/utils/api'

export default function ({ $axios }: Context) {
  // $axios.onRequest((config) => {
  // console.log(request)
  // request.data = SnakeConverter.convert(request.data)
  // return request
  // console.log(config.url)
  // })

  initializeAxios($axios)
  $axios.onResponse((response) => {
    response.data = CamelConverter.convert(response.data)
    return response
  })
}
