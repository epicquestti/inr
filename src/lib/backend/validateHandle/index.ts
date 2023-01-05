import { handlerProps } from "@lib/types/handlerProps"
import ApiModel from "@schema/Api"
import FuncaoModel from "@schema/Funcao"
import FuncaoApiModel from "@schema/FuncaoApi"
import tipoUsuarioModel from "@schema/TipoUsuario"
import usuarioModel from "@schema/Usuario"
import { JsonWebTokenError, verify } from "jsonwebtoken"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import getConfig from "next/config"
import { connect } from "../database"
import normalizePath from "../normalizePath"

type validateApiOptions = {
  validationLevel: "free" | "credential" | "full"
}

const validateHandle = (handler: handlerProps) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        method,
        url,
        query,
        cookies: { inr }
      } = req

      if (!method) throw new Error(`Método não permitido.`)

      if (!handler[method.toLowerCase() as keyof typeof handler])
        throw new Error(
          `Método [${method.toUpperCase()}] não permitido para essa requisição.`
        )

      const methodHandler =
        handler[method.toLowerCase() as keyof typeof handler]

      if (!methodHandler) throw new Error(`Método não permitido.`)

      await connect()

      const normalizedPath = await normalizePath(url, query)

      const api = await ApiModel.findOne({ url: normalizedPath })
      if (!api) throw new Error("acesso inexistente.")

      const funcaoRelation = await FuncaoApiModel.findOne({ api: api._id })
      if (!funcaoRelation) throw new Error("funcionalidade inexistente")

      const funcao = await FuncaoModel.findById(funcaoRelation.funcao)
      if (!funcao) throw new Error("funcionalidade inexistente")

      if (funcao.nivel === "publico") return await methodHandler(req, res)

      if (!inr)
        throw new Error("Credenciais inexistente. acesso não permitido.")

      const { serverRuntimeConfig } = getConfig()

      const userIdString = verify(inr, serverRuntimeConfig.jwt_key)
      const user = await usuarioModel.findOne({
        _id: new ObjectId(userIdString.toString())
      })

      if (!user) throw new Error("Usuário não encontrado.")

      const userType = await tipoUsuarioModel.findOne({ _id: user.tipoUsuario })

      if (!userType) throw new Error("Usuário não encontrado.")

      if (userType.super || funcao.nivel === "livre") {
        return await methodHandler(req, res, {
          _id: user._id,
          nome: user.nome,
          tipo: {
            _id: userType._id,
            tipo: userType.text
          }
        })
      }

      const autorizadoPorTipo = funcao.tipoUsuarioAutorizado?.findIndex(
        ta => ta === user.tipoUsuario
      )

      if (autorizadoPorTipo && autorizadoPorTipo >= 0) {
        return await methodHandler(req, res, {
          _id: user._id,
          nome: user.nome,
          tipo: {
            _id: userType._id,
            tipo: userType.text
          }
        })
      }

      if (!user.permissoes) throw new Error("Não Autorizado")

      const userFunction = user.permissoes.findIndex(
        up => up._id === funcao._id
      )

      if (userFunction < 0) throw new Error("Não Autorizado")

      if (!user.permissoes[userFunction].acoes)
        throw new Error("Não Autorizado")

      const userFunctionAction = user.permissoes[userFunction].acoes?.findIndex(
        a => a === api.type
      )

      if (!userFunctionAction) throw new Error("Não Autorizado")

      if (userFunctionAction >= 0) {
        return await methodHandler(req, res, {
          _id: user._id,
          nome: user.nome,
          tipo: {
            _id: userType._id,
            tipo: userType.text
          }
        })
      } else throw new Error("Não Autorizado")
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
