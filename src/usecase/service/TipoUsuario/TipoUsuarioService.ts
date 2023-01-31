import { defaultResponse } from "@lib/types/defaultResponse"
import TipoUsuarioFuncoesRepository from "@usecase/repository/TipoUsuarioFuncoesRepository"
import TipoUsuarioRepository from "@usecase/repository/TipoUsuarioRepository"
import { tipoUsuarioSaveOutput } from "@validation/TipoUsuario/tipoUsuarioSave"
import { ObjectId } from "mongodb"
import ITipoUsuarioService from "./ITipoUsuarioService"

export default class TipoUsuarioService implements ITipoUsuarioService {
  constructor(
    private _tipoUsuarioRepository: TipoUsuarioRepository,
    private _tipoUsuarioFuncoesRepository: TipoUsuarioFuncoesRepository
  ) {}

  async tipoUsuarioSave(
    params: tipoUsuarioSaveOutput
  ): Promise<defaultResponse> {
    try {
      if (!params._id) {
        const verifyNome =
          await this._tipoUsuarioRepository.tipoUsuarioGetByNome(params.nome)
        if (verifyNome) {
          throw new Error(
            "Já existe um Tipo de Usuário cadastrado com o nome fornecido."
          )
        }

        const saveResponse = await this._tipoUsuarioRepository.tipoUsuarioSave(
          params
        )

        if (!saveResponse) throw new Error("Erro ao criar Tipo de Usuário.")

        if (params.funcoes.length > 0) {
          for (let i = 0; i < params.funcoes.length; i++) {
            const relationResponse =
              await this._tipoUsuarioFuncoesRepository.createRelation(
                saveResponse._id,
                params.funcoes[i]
              )

            if (!relationResponse)
              throw new Error("Erro ao criar Relações de Tipo de Usuãrio.")
          }
        }

        return {
          success: true,
          message: "Tipo de Usuário criado com sucesso.",
          data: saveResponse
        }
      } else {
        const tipoUsuarioExists =
          await this._tipoUsuarioRepository.getTipoUsuarioById(params._id)

        if (!tipoUsuarioExists)
          throw new Error(
            "Nenhum Tipo de Usuário encontrado com o ID fornecido."
          )

        const verifyNome =
          await this._tipoUsuarioRepository.tipoUsuarioGetByNome(params.nome)
        if (verifyNome) {
          throw new Error(
            "Já existe um Tipo de Usuário cadastrado com o nome fornecido."
          )
        }

        const updateResponse =
          await this._tipoUsuarioRepository.tipoUsuarioUpdate(params)

        if (updateResponse <= 0)
          throw new Error("Erro ao editar Tipo de Usuário.")

        await this._tipoUsuarioFuncoesRepository.deleteRelations(params._id)

        if (params.funcoes.length > 0) {
          for (let i = 0; i < params.funcoes.length; i++) {
            const relationResponse =
              await this._tipoUsuarioFuncoesRepository.createRelation(
                params._id,
                params.funcoes[i]
              )

            if (!relationResponse)
              throw new Error("Erro ao criar Relações de Tipo de Usuãrio.")
          }
        }

        return {
          success: true,
          message: "Tipo de Usuário editado com sucesso.",
          data: updateResponse
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async tipoUsuarioGetbyId(id: ObjectId): Promise<defaultResponse> {
    try {
      const repositoryResponse =
        await this._tipoUsuarioRepository.getTipoUsuarioById(id)

      if (!repositoryResponse)
        throw new Error("Nenhum Tipo de Usuário encontrado.")

      return {
        success: true,
        message: "Exibindo Tipo de Usuário.",
        data: repositoryResponse
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async tipoUsuarioDeleteRelation(id: ObjectId): Promise<defaultResponse> {
    try {
      const relationResponse =
        await this._tipoUsuarioFuncoesRepository.deleteRelations(id)

      return {
        success: true,
        message: "Relações excluídas com sucesso.",
        data: relationResponse
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async tipoUsuarioDelete(id: ObjectId): Promise<defaultResponse> {
    try {
      const repositoryResponse =
        await this._tipoUsuarioRepository.tipoUsuarioDelete(id)

      if (repositoryResponse <= 0)
        throw new Error("Erro ao excluir Tipo de Usuário.")

      return {
        success: true,
        message: "Tipo de Usuário excluído com sucesso.",
        data: repositoryResponse
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
