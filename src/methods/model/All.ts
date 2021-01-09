const $All: any = function (context: any) {
  return function (this: any, payload: any) {
    const collectionName = this.name
    const collection = context.loki.getCollection(collectionName)
    return collection.find()
  }
}
export default $All
