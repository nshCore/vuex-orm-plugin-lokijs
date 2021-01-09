const $delete: any = function (context: any) {
  return async function (this: any, payload: any) {
    const collectionName = this.name
    const collection = context.loki.getCollection(collectionName)
    const data: any = {}
    data[this.localKey()] = payload
    collection.findAndRemove(data)
    const result = await this.delete(payload)
    context.loki.saveDatabase()
  }
}
export default $delete
