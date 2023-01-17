import { schema, types } from "papr"

import { papr } from "../lib/backend"

const updatesSchema = schema({
  version: types.number({ required: true }),
  major: types.number({ required: true }),
  minor: types.number({ required: true }),
  severity: types.string({ required: true }),
  link: types.string({ required: true }),
  vigent: types.boolean({ required: false })
})

const updatesModel = papr.model("Updates", updatesSchema)
export type updatesDocument = typeof updatesSchema[0]
export default updatesModel
