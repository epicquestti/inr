/* eslint-disable no-unused-vars */

import { MongoClient } from "mongodb"
import Papr from "papr"

/* eslint-disable no-var */
declare global {
  var mongo: MongoClient
  var papr: Papr
}
