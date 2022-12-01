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

      switch (options.validationLevel) {
        case "free": {
          const methodHandlerFree =
            handler[method.toLowerCase() as keyof typeof handler]
          if (methodHandlerFree) {
            await connect()
            return await methodHandlerFree(req, res)
          } else throw new Error(`Método Não Permitido.`)
        }
        // case "credential": {
        //   if (!cookies.qh) throw new Error("Credenciais Ausentes.")

        //   const credential: any = JSON.parse(
        //     verify(cookies.qh, jwtConfig.key).toString()
        //   )

        //   const methodHandlerCredential =
        //     handler[method.toLowerCase() as keyof typeof handler]

        //   if (methodHandlerCredential) {
        //     await connect()
        //     return await methodHandlerCredential(req, res, {
        //       _id: credential._idUser,
        //       tipo: credential.tipo
        //     })
        //   } else throw new Error(`Método Não Permitido.`)
        // }
        // case "full": {
        //   if (!cookies.qh) throw new Error("Credenciais Ausentes.")
        //   const credentialFull: any = JSON.parse(
        //     verify(cookies.qh, jwtConfig.key).toString()
        //   )
        //   const normalizedPath = await normalizePath(url, query)

        //   await connect()

        //   const user = await UsuarioModel.findById(credentialFull._idUser)

        //   if (!user) throw new Error("Erro ao validar usuário.")

        //   const userType = await UsuarioTipoModel.findOne({
        //     _id: user._id
        //   })

        //   if (!userType) throw new Error("Erro ao validar usuário.")

        //   if (userType.tipo === "Super User") {
        //     const methodHandler =
        //       handler[method.toLowerCase() as keyof typeof handler]

        //     if (methodHandler) {
        //       return await methodHandler(req, res, {
        //         _id: user._id.toString(),
        //         tipo: { _id: userType._id.toString(), tipo: userType.tipo }
        //       })
        //     } else throw new Error(`Método Não Permitido.`)
        //   } else {
        //     const api = await ApiModel.findOne({
        //       url: normalizedPath,
        //       "metodo.metodo": method
        //     })

        //     if (!api) throw new Error(`Api inexistente.`)

        //     const funcao = await FuncaoApiModel.findOne({
        //       api: api._id
        //     })

        //     if (!funcao) throw new Error(`Api inexistente.`)

        //     const permissao = await UsuarioPermissaoModel.findOne({
        //       funcao: funcao._id,
        //       usuario: user._id
        //     })

        //     if (!permissao) throw new Error("Acesso negado. Sem Autorização.")

        //     const access = UsuarioPermissaoAccessModel.findOne({
        //       permissao: permissao._id,
        //       "access._id": api._id
        //     })

        //     if (!access) throw new Error("Acesso negado. Sem Autorização.")

        //     const methodHandler =
        //       handler[method.toLowerCase() as keyof typeof handler]

        //     if (methodHandler) {
        //       return await methodHandler(req, res, {
        //         _id: user._id.toString(),
        //         tipo: { _id: userType._id.toString(), tipo: userType.tipo }
        //       })
        //     } else throw new Error(`Método Não Permitido.`)
        //   }
        // }
      }
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
