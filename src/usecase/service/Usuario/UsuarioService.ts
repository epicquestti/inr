import { defaultResponse } from "@lib/types/defaultResponse"
import FuncaoRepository from "@usecase/repository/FuncaoRepository"
import TipoUsuarioRepository from "@usecase/repository/TipoUsuarioRepository"
import UsuarioRepository from "@usecase/repository/UsuarioRepository"
import { usuarioIdOutput } from "@validation/Usuario/usuarioId"
import { usuarioSaveOutput } from "@validation/Usuario/usuarioSave"
import { compareSync } from "bcrypt"
import { sign, verify } from "jsonwebtoken"
import { ObjectId } from "mongodb"
import getConfig from "next/config"
import IUsuarioService from "./IUsuarioService"

export default class UsuarioService implements IUsuarioService {
  constructor(
    private _usuarioRepository: UsuarioRepository,
    private _tipoUsuarioRepository: TipoUsuarioRepository,
    private _funcaoRepository: FuncaoRepository
  ) {}
  async authenticationPanelContingency(params: {
    credential: string
  }): Promise<defaultResponse> {
    try {
      const { serverRuntimeConfig } = getConfig()
      const verifyCredentialResult = verify(
        params.credential,
        serverRuntimeConfig.jwt_key
      )

      if (!verifyCredentialResult)
        throw new Error("Credenciais ausentes, Faça login.")

      const user = await this._usuarioRepository.getUserById(
        new ObjectId(verifyCredentialResult.toString())
      )

      if (!user) throw new Error("Usuário não encontrado. Faça login.")

      const userType = await this._tipoUsuarioRepository.getTipoUsuarioById(
        user.tipoUsuario
      )

      if (!userType) throw new Error("Erro ao realizar login.")

      if (userType.super) {
        const appSuperFunctions =
          await this._funcaoRepository.getSuperFunctions()

        const permissoes = appSuperFunctions.map(asfi => ({
          _id: asfi._id,
          nome: asfi.nome,
          icone: asfi.icone,
          tipo: asfi.tipo,
          root: asfi.root,
          acoes: asfi.acoes
        }))

        return {
          success: true,
          data: {
            nome: user.nome,
            tipo: { _id: user.tipoUsuario, tipo: userType.text },
            credential: params.credential,
            permissoes: permissoes
          }
        }
      } else {
        const appFunctions =
          await this._funcaoRepository.getFunctionLivreByTipo(user.tipoUsuario)

        const permissoes = appFunctions.map(afi => ({
          _id: afi._id,
          nome: afi.nome,
          icone: afi.icone,
          tipo: afi.tipo,
          root: afi.root,
          acoes: afi.acoes
        }))

        user.permissoes?.forEach(item =>
          permissoes.push({
            _id: item._id,
            nome: item.nome,
            tipo: item.tipo,
            root: item.root,
            acoes: item.acoes,
            icone: item.icone
          })
        )

        return {
          success: true,
          data: {
            nome: user.nome,
            tipo: { _id: user.tipoUsuario, tipo: userType.text },
            credential: params.credential,
            permissoes: permissoes
          }
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async authenticationPanel(params: {
    email: string
    senha: string
    keepConnected: boolean
  }): Promise<defaultResponse> {
    try {
      const { serverRuntimeConfig } = getConfig()

      const user = await this._usuarioRepository.getUserByEmail(params.email)
      if (!user) throw new Error("Usuário não encontrado.")

      const match = await compareSync(params.senha, user.senha)
      if (!match) throw new Error("senha incorreta.")

      const userType = await this._tipoUsuarioRepository.getTipoUsuarioById(
        user.tipoUsuario
      )

      if (!userType) throw new Error("Erro ao realizar login.")

      const token = sign(user._id.toString(), serverRuntimeConfig.jwt_key)

      if (userType.super) {
        const appSuperFunctions =
          await this._funcaoRepository.getSuperFunctions()

        const permissoes = appSuperFunctions.map(asfi => ({
          _id: asfi._id,
          nome: asfi.nome,
          icone: asfi.icone,
          tipo: asfi.tipo,
          root: asfi.root,
          acoes: asfi.acoes
        }))

        return {
          success: true,
          data: {
            nome: user.nome,
            tipo: { _id: user.tipoUsuario, tipo: userType.text },
            credential: token,
            permissoes: permissoes
          }
        }
      } else {
        const appFunctions =
          await this._funcaoRepository.getFunctionLivreByTipo(user.tipoUsuario)

        const permissoes = appFunctions.map(afi => ({
          _id: afi._id,
          nome: afi.nome,
          icone: afi.icone,
          tipo: afi.tipo,
          root: afi.root,
          acoes: afi.acoes
        }))

        user.permissoes?.forEach(item =>
          permissoes.push({
            _id: item._id,
            nome: item.nome,
            tipo: item.tipo,
            root: item.root,
            acoes: item.acoes,
            icone: item.icone
          })
        )

        return {
          success: true,
          data: {
            nome: user.nome,
            tipo: { _id: user.tipoUsuario, tipo: userType.text },
            credential: token,
            permissoes: permissoes
          }
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async usuarioSave(params: usuarioSaveOutput): Promise<defaultResponse> {
    try {
      if (!params._id) {
        const usuarioExists = await this._usuarioRepository.getUserByEmail(
          params.email
        )

        if (usuarioExists) throw new Error("E-mail fornecido já cadastrado.")

        const repoResponse = await this._usuarioRepository.usuarioCreate(params)

        if (!repoResponse?._id)
          throw new Error("Erro ao criar Usuário na camada Service.")

        return {
          success: true,
          message: "Usuário criado com sucesso.",
          data: repoResponse
        }
      } else {
        const usuarioExists = await this._usuarioRepository.getUserById(
          params._id
        )

        console.log("usuarioExists", usuarioExists)

        if (!usuarioExists) throw new Error("Usuário não encontrado.")

        const dbResponse = await this._usuarioRepository.usuarioUpdate(params)

        console.log("dbResponse", dbResponse)

        return {
          success: true,
          message: "Usuário editado com sucesso.",
          data: dbResponse
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async usuarioGetById(params: usuarioIdOutput): Promise<defaultResponse> {
    try {
      const repoResponse = await this._usuarioRepository.getUserById(params.id)

      let tipoUsuarioFind
      if (repoResponse) {
        const fff = new ObjectId(repoResponse.tipoUsuario)

        tipoUsuarioFind = await this._tipoUsuarioRepository.getTipoUsuarioById(
          new ObjectId(fff)
        )
      }

      if (!repoResponse?._id) throw new Error("Usuário não encontrado.")

      return {
        success: true,
        message: "Exibindo Usuário.",
        data: { usuario: repoResponse, tipoUsuario: tipoUsuarioFind }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
