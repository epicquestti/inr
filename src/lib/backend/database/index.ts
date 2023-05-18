import { Factory, Pool, createPool } from "generic-pool"
import { MongoClient } from "mongodb"
import Papr from "papr"
import paprConfig from "../../../config/papr"
let client: MongoClient | null = null
const papr = new Papr()
const factoryOptions = {
  max: 200,
  min: 1,
  acquireTimeoutMillis: 30000
}
const factory: Factory<MongoClient> = {
  create: async () => {
    try {
      if (!paprConfig.uri)
        throw new Error("Erro ao iniciar conexão com banco de dados.")

      return await MongoClient.connect(paprConfig.uri)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  destroy: (client: MongoClient) => client.close()
}
let clientPool: Pool<MongoClient> = createPool(factory, factoryOptions)

const connect = async () => {
  try {
    if (clientPool) {
      if (process.env.NODE_ENV === "production") {
        client = await clientPool.acquire()
      } else {
        if (!global.mongo) {
          global.mongo = await clientPool.acquire()
        }

        client = global.mongo
      }

      papr.initialize(client.db(paprConfig.bdName))
      await papr.updateSchemas()
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const diconnect = async () => {
  try {
    if (clientPool) await (await clientPool.acquire()).close()
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { connect, diconnect }
export default papr
