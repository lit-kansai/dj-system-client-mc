import { Context } from '@nuxt/types'
import { CamelConverter } from '~/utils/snakeToCamel'

export default function ({ $axios }: Context) {
  $axios.onRequest((config) => {
    console.log(config.url)
  })

  $axios.onResponse((response) => {
    response.data = CamelConverter.convert(response.data)
    return response
  })
}
