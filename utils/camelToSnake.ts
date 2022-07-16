export class CamelToSnake {
  static convert(obj: { [key: string]: any } | any[]): any {
    if (typeof obj !== 'object') {
      return obj
    }
    if (Array.isArray(obj)) {
      return obj.map(CamelToSnake.convert)
    }
    if (obj === null) {
      return null
    }
    return Object.keys(obj).reduce((acc: any, key: string) => {
      // 値がobjectの場合は再帰的にconvertを実行
      const type = Object.prototype.toString.call(obj[key])
      if (type === '[object Object]' || type === '[object Array]') {
        acc[CamelToSnake.toCamel(key)] = CamelToSnake.convert(obj[key])
        return acc
      }
      acc[CamelToSnake.toCamel(key)] = obj[key]
      return acc
    }, {})
  }

  // snake_caseの単語をlowerCamelに変換する
  static toCamel(str: string) {
    return str.replace(/_(\w)/g, (_match, capture) => {
      return capture.toUpperCase()
    })
  }
}
