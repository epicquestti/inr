import { handlerProps } from "@lib/types/handlerProps"
import { JsonWebTokenError } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../database"

type validateApiOptions = {
  validationLevel: "free" | "credential" | "full"
}

const validateHandle = (handler: handlerProps, options: validateApiOptions) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { method, url, query, cookies } = req

      if (!method) throw new Error(`Método não permitido.`)

      if (!handler[method.toLowerCase() as keyof typeof handler])
        throw new Error(
          `Método [${method.toUpperCase()}] não permitido para essa requisição.`
        )

      const methodHandler =
        handler[method.toLowerCase() as keyof typeof handler]

      if (!methodHandler) throw new Error(`Método Não Permitido.`)

      await connect()

      if (options.validationLevel === "free")
        return await methodHandler(req, res)
    } catch (error: any) {
      if (error instanceof JsonWebTokenError)
        return res.status(200).json({
          success: false,
          message: "Não Autorizado"
        })

      return res.status(200).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default validateHandle
