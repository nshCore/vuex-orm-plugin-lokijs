import AES from 'crypto-js/aes'
import encUTF8 from 'crypto-js/enc-utf8'

function encrypt (data: any, password: any) {
  try {
    return AES.encrypt(JSON.stringify(data), password).toString()
  } catch (exception) {
    throw new Error(exception.message)
  }
}

const $insert: any = function (context: any) {
  return async function (this: any, payload: any) {
    const collectionName = this.name
    const { password } = payload

    const result = await this.insert(payload)
    const collection = context.loki.getCollection(collectionName)
    result[this.entity].forEach((item: any) => {
      const jsonData = item.$toJson()

      if (this.AES) {
        this.AES.forEach((key: any) => {
          if (jsonData[key]) {
            if (!password) {
              throw new Error(`Cannot insert data. The ${collectionName} model contains encrypted fields ( ${this.AES}).
                               The object passed to $insert() method has to have a password property set.`)
            }

            jsonData[key] = encrypt(jsonData[key], password)
          }
        })
      }

      collection.insert(jsonData)
    })
    context.loki.saveDatabase()
    return result
  }
}
export default $insert
