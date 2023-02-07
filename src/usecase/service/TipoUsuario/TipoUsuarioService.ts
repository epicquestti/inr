import { defaultResponse } from "@lib/types/defaultResponse"
import { funcaoBooleanType } from "@lib/types/tipoUsuario"
import FuncaoRepository from "@usecase/repository/FuncaoRepository"
import TipoUsuarioFuncoesRepository from "@usecase/repository/TipoUsuarioFuncoesRepository"
import TipoUsuarioRepository from "@usecase/repository/TipoUsuarioRepository"
import { tipoUsuarioIdOutput } from "@validation/TipoUsuario/tipoUsuarioId"
import { tipoUsuarioSaveOutput } from "@validation/TipoUsuario/tipoUsuarioSave"
import { ObjectId } from "mongodb"
import ITipoUsuarioService from "./ITipoUsuarioService"

export default class TipoUsuarioService implements ITipoUsuarioService {
  constructor(
    private _tipoUsuarioRepository: TipoUsuarioRepository,
    private _tipoUsuarioFuncoesRepository: TipoUsuarioFuncoesRepository,
    private _funcoesRepository: FuncaoRepository
  ) {}
  tipoUsuarioUpdate(params: {
    _id?: ObjectId | undefined
    nome: string
    funcoes: ObjectId[]
    super: boolean
  }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }

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

        const updateResponse =
          await this._tipoUsuarioRepository.tipoUsuarioUpdate(params)

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

  async tipoUsuarioGetbyId(id: tipoUsuarioIdOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse =
        await this._tipoUsuarioRepository.getTipoUsuarioById(id.id)

      if (!repositoryResponse)
        throw new Error("Nenhum Tipo de Usuário encontrado.")

      const relationFind =
        await this._tipoUsuarioFuncoesRepository.findRelations(
          repositoryResponse._id
        )

      const allFunctions = await this._funcoesRepository.funcoesGetAll()

      let functionsArray: funcaoBooleanType[] = []

      if (allFunctions) {
        for (let i = 0; i < allFunctions.length; i++) {
          const findItem = relationFind.findIndex(item => {
            return item.funcaoId.toString() === allFunctions[i]._id.toString()
          })

          console.log("Item", findItem)

          if (findItem < 0) {
            functionsArray.push({
              _id: allFunctions[i]._id,
              checked: false,
              icone: allFunctions[i].icone,
              nivel: allFunctions[i].nivel,
              nome: allFunctions[i].nome,
              root: allFunctions[i].root,
              tipo: allFunctions[i].tipo
            })
          } else {
            functionsArray.push({
              _id: allFunctions[i]._id,
              checked: true,
              icone: allFunctions[i].icone,
              nivel: allFunctions[i].nivel,
              nome: allFunctions[i].nome,
              root: allFunctions[i].root,
              tipo: allFunctions[i].tipo
            })
          }
        }
      }

      // const relationArray: ObjectId[] = relationFind.map(item => item.funcaoId)

      // const relationList: any = await this._funcoesRepository.funcaoListSearch(
      //   relationArray
      // )

      // for (let i = 0; i < relationList.length; i++) {
      //   relationList[i].checked = true
      // }

      const tipoUsuarioObj: {} = {
        tipoUsuario: repositoryResponse,
        funcoes: functionsArray
      }

      return {
        success: true,
        message: "Exibindo Tipo de Usuário.",
        data: tipoUsuarioObj
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
