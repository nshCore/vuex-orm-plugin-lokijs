import AES from 'crypto-js/aes'
import encUTF8 from 'crypto-js/enc-utf8'

function encrypt (data: any, password: any) {
  try {
    return AES.encrypt(JSON.stringify(data), password).toString()
  } catch (exception) {
    throw new Error(exception.message)
  }
}

const $update: any = function (context: any) {
  return async function (this: any, payload: any) {
    const collectionName = this.name
    const { password } = payload

    if (this.AES) {
      this.AES.forEach((key: any) => {
        if (payload.data[key] && !password) {
          throw new Error(`attempted to update an encrypted field "${key}" without providing password`)
        }
        if (payload.data[key]) {
          payload.data[key] = encrypt(payload.data[key], password)
        }
      })
    }

    const collection = context.loki.getCollection(collectionName)

    if (typeof payload.where === 'function') {
      collection.updateWhere(payload.where, (item: any) => {
        return Object.assign(item, payload.data)
      })
    } else {
      console.error(`data has not been put into loki, use vuexorm where() filter function when you do updates:

        User.update({
          where: (record) => {
            return record.id === 2
          },

          data: { age: 24 }
        })

      `)
    }

    const result = await this.update(payload)
    context.loki.saveDatabase()
  }
}

export default $update
