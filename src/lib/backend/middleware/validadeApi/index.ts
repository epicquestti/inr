import { NextApiRequest, NextApiResponse } from "next"
import connect from "../../../../lib/backend/database"

import { handlerProps } from "./type"

const validateHandle = (handler: handlerProps) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { method, url, query } = req

      if (!method) throw new Error(`Método Não Permitido.`)

      if (handler[method.toLowerCase() as keyof typeof handler]) {
        const methodHandler =
          handler[method.toLowerCase() as keyof typeof handler]

        if (methodHandler) {
          await connect()
          return await methodHandler(req, res)
        } else throw new Error(`Método Não Permitido.`)
      } else throw new Error(`Método Não Permitido.`)
    } catch (error: any) {
      return res.status(200).send({
        success: false,
        message: error.message
      })
    }
  }
}

export { validateHandle }
