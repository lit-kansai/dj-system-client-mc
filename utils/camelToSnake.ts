export class CamelConverter {
  static convert(obj: { [key: string]: any }) {
    return Object.keys(obj).reduce(
      (acc: { [key: string]: any }, key: string) => {
        // 値がobjectの場合は再帰的にconvertを実行
        if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
          acc[this.toCamel(key)] = this.convert(obj[key])
          return acc
        }
        acc[this.toCamel(key)] = obj[key]
        return acc
      },
      {}
    )
  }

  // snake_caseの単語をlowerCamelに変換する
  static toCamel(str: string) {
    return str.replace(/_(\w)/g, (_match, capture) => {
      return capture.toUpperCase()
    })
  }
}
