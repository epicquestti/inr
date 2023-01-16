import { MongoClient } from "mongodb"
import Papr from "papr"
import paprConfig from "../../../config/papr"
let client: MongoClient
const papr = new Papr()

export async function connect() {
  if (paprConfig.uri) {
    if (process.env.NODE_ENV === "production") {
      client = await MongoClient.connect(paprConfig.uri)
    } else {
      if (!global.mongo) {
        global.mongo = await MongoClient.connect(paprConfig.uri)
      }
    }

    client = global.mongo
    client.startSession()
    papr.initialize(client.db(paprConfig.bdName))
    await papr.updateSchemas()
  }
}

export async function disconnect() {
  await client.close()
}

export async function getClient() {
  return client
}

export default papr
