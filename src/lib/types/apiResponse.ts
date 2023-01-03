import { defaultResponse } from "./defaultResponse"

export type apiResponse = defaultResponse & {
  redirect?: string
}
