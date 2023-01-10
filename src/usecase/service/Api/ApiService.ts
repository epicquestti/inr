import { defaultResponse } from "@lib/types/defaultResponse"
import ApiRepository from "@usecase/repository/ApiRepository"
import { ObjectId } from "mongodb"
import { IApiService } from "./IApiService"

export default class ApiService implements IApiService {
  constructor(private _apiRepository: ApiRepository) {}
  async getApiById(params: { id: ObjectId }): Promise<defaultResponse> {
    try {
      const api = await this._apiRepository.getApiById(params.id)

      if (!api) throw new Error("Api não encontrado.")

      return {
        success: true,
        data: api
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async deleteApi(params: { id: ObjectId }): Promise<defaultResponse> {
    try {
      const api = await this._apiRepository.deleteApi(params.id)

      if (!api || api <= 0) throw new Error("Nenhuma api foi enxcluida.")

      return {
        success: true,
        message: "Api Exluida com sucesso"
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async saveApi(params: {
    _id?: string | ObjectId | null | undefined
    url: string
    metodo: string
    tipo: string
  }): Promise<defaultResponse> {
    try {
      let isNew
      if (!params._id) {
        isNew = await this._apiRepository.createApi(
          params.url,
          params.metodo,
          params.tipo
        )
      } else {
        const updated = await this._apiRepository.updateApi(
          params._id as ObjectId,
          params.url,
          params.metodo,
          params.tipo
        )

        if (updated <= 0) throw new Error("Nenhuma alteração foi feita.")
      }

      return {
        success: true,
        message: "Api salva com sucesso",
        data: {
          _id: params._id ? params._id : isNew ? isNew._id : "",
          url: params.url,
          metodo: params.metodo,
          tipo: params.tipo
        }
      }
    } catch (error: any) {
      return {
        success: true,
        message: error.message
      }
    }
  }
}
