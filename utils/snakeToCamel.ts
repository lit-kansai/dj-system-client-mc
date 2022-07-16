export class SnakeToCamel {
  static convert(obj: { [key: string]: any } | any[]): any {
    if (typeof obj !== 'object') {
      return obj
    }
    if (Array.isArray(obj)) {
      return obj.map(SnakeToCamel.convert)
    }
    if (obj === null) {
      return null
    }
    return Object.keys(obj).reduce(
      (acc: { [key: string]: any }, key: string) => {
        // 値がobjectの場合は再帰的にconvertを実行
        const type = Object.prototype.toString.call(obj[key])
        if (type === '[object Object]' || type === '[object Array]') {
          acc[SnakeToCamel.toSnake(key)] = SnakeToCamel.convert(obj[key])
          return acc
        }
        acc[SnakeToCamel.toSnake(key)] = obj[key]
        return acc
      },
      {}
    )
  }

  static toSnake(key: string) {
    return key.replace(/([A-Z])/g, '_$1').toLowerCase()
  }
}
