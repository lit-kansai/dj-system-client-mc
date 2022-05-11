export class SnakeConverter {
  static convert(obj: { [key: string]: any }) {
    return Object.keys(obj).reduce(
      (acc: { [key: string]: any }, key: string) => {
        // 値がobjectの場合は再帰的にconvertを実行
        if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
          acc[this.toSnake(key)] = this.convert(obj[key])
          return acc
        }
        acc[this.toSnake(key)] = obj[key]
        return acc
      },
      {}
    )
  }
  
  static toSnake(key: string) {
    return key.replace(/([A-Z])/g, '_$1').toLowerCase()
  }
}
