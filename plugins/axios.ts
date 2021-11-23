import { Context } from '@nuxt/types'

export default function ({ $axios }: Context) {
  $axios.onRequest((config) => {
    console.log(config.url)
  })
}
