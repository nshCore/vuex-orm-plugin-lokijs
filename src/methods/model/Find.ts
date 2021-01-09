const $find: any = function (context: any) {
  return function (this: any, payload: any) {
    const collectionName = this.name
    const collection = context.loki.getCollection(collectionName)
    const data: any = {}
    data[this.localKey()] = payload
    return collection.find(data)
  }
}
export default $find
