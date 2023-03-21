import { defaultResponse } from "@lib/types/defaultResponse"
import AutorRepository from "@usecase/repository/AutorRepository"
import { autorIdOutput } from "@validation/Autor/autorId"
import { autorSaveOutput } from "@validation/Autor/autorSave"
import { ObjectId } from "mongodb"
import IAutorService from "./IAutorService"

export default class AutorService implements IAutorService {
  constructor(private _autorRepository: AutorRepository) {}

  async autorSave(params: autorSaveOutput): Promise<defaultResponse> {
    let response
    try {
      if (!params._id) {
        const verifyNome = await this._autorRepository.autorGetByNome(
          params.nome
        )

        if (verifyNome) throw new Error("Nome fornecido já está cadastrado.")

        const createResponse = await this._autorRepository.autorCreate(params)

        if (!createResponse) throw new Error("Erro ao criar Autor.")
        response = createResponse
      } else {
        const updateResponse = await this._autorRepository.autorUpdate(params)

        if (updateResponse <= 0) throw new Error("Nada atualizado.")
        response = updateResponse
      }

      if (!params._id) {
        return {
          success: true,
          message: "Autor criado com sucesso.",
          data: response
        }
      } else {
        return {
          success: true,
          message: "Autor editado com sucesso.",
          data: response
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async autorGetById(params: ObjectId): Promise<defaultResponse> {
    console.log("Service", params)

    try {
      const repositoryResponse = await this._autorRepository.autorGetById(
        params
      )
      console.log("Repo", repositoryResponse)

      if (!repositoryResponse) throw new Error("Nenhum autor(a) encontrado(a).")

      return {
        success: true,
        message: "Exibindo resultado.",
        data: repositoryResponse
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async autorDelete(id: autorIdOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse = await this._autorRepository.autorDelete(id._id)

      if (!repositoryResponse || repositoryResponse <= 0)
        throw new Error("Erro ao excluir Autor.")

      return {
        success: true,
        message: "Autor(a) excluído(a) com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
