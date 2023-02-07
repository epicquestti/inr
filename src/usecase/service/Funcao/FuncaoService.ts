import { defaultResponse } from "@lib/types/defaultResponse"
import ApiRepository from "@usecase/repository/ApiRepository"
import FuncaoApiRepository from "@usecase/repository/FuncaoApiRepository"
import FuncaoRepository from "@usecase/repository/FuncaoRepository"
import TipoUsuarioRepository from "@usecase/repository/TipoUsuarioRepository"
import { funcaoIdOutput } from "@validation/Funcoes/funcaoId"
import { funcaoSaveOutput } from "@validation/Funcoes/funcaoSave"
import IFuncaoService from "./IFuncaoService"

export default class FuncaoService implements IFuncaoService {
  constructor(
    private _funcaoRepository: FuncaoRepository,
    private _funcaoApiRepository: FuncaoApiRepository,
    private _apiRepository: ApiRepository,
    private _tipoUsuarioRepository: TipoUsuarioRepository
  ) {}

  async funcaoSave(params: funcaoSaveOutput): Promise<defaultResponse> {
    try {
      if (!params._id) {
        const verifyRoot = await this._funcaoRepository.funcaoVerifyRoot(
          params.root
        )

        if (verifyRoot)
          throw new Error(
            "Já existe uma Função cadastrada com o Root fornecido."
          )

        const saveResponse = await this._funcaoRepository.funcaoSave(params)

        if (!saveResponse) throw new Error("Erro ao criar Função.")

        return {
          success: true,
          message: "Função criada com sucesso.",
          data: saveResponse
        }
      } else {
        const functionExist = await this._funcaoRepository.funcaoGetById({
          id: params._id
        })

        if (!functionExist)
          throw new Error("Função com o ID fornecido não encontrada.")

        const verifyRoot = await this._funcaoRepository.funcaoVerifyRootWithId(
          params.root,
          params._id
        )

        if (verifyRoot)
          throw new Error(
            "Já existe uma Função cadastrada com o Root fornecido."
          )

        const update = await this._funcaoRepository.funcaoUpdate(params)

        // if (update > 0) {
        //   if (params.apisRelacionadas && params.apisRelacionadas.length > 0) {
        //     const deleteRelations =
        //       await this._funcaoApiRepository.deleteRelations(params._id)

        //     if (deleteRelations > 0) {
        //       let apiArray: any[] = []
        //       for (let i = 0; i < params.apisRelacionadas.length; i++) {
        //         apiArray.push({
        //           funcao: params?._id,
        //           api: new ObjectId(params.apisRelacionadas[i])
        //         })
        //       }

        //       await this._funcaoApiRepository.createRelation(apiArray)
        //     }
        //   }
        // } else {
        //   throw new Error("Erro ao editar Função.")
        // }

        return {
          success: true,
          message: "Função editada com sucesso."
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async funcaoGetById(id: funcaoIdOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse = await this._funcaoRepository.funcaoGetById(id)

      if (!repositoryResponse) throw new Error("Nenhuma Função encontrada.")

      // const apisRelacionadas = await this._funcaoApiRepository.funcaoApiGetApis(
      //   id.id
      // )

      // let apisCompletas
      // if (apisRelacionadas && apisRelacionadas?.length > 0) {
      //   const apiArray: ObjectId[] = []

      //   for (let i = 0; i < apisRelacionadas.length; i++) {
      //     apiArray.push(apisRelacionadas[i].api)
      //   }

      //   apisCompletas = await this._apiRepository.getApiList(apiArray)
      // }

      // let tipoUsuarioCompleto
      // if (
      //   repositoryResponse?.tipoUsuarioAutorizado &&
      //   repositoryResponse?.tipoUsuarioAutorizado?.length > 0
      // ) {
      //   tipoUsuarioCompleto =
      //     await this._tipoUsuarioRepository.tipoUsuarioGetList(
      //       repositoryResponse?.tipoUsuarioAutorizado
      //     )
      // }

      return {
        success: true,
        message: "Exibindo Função.",
        data: {
          funcao: repositoryResponse
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async funcaoDelete(id: funcaoIdOutput): Promise<defaultResponse> {
    try {
      const repositoryResponse = await this._funcaoRepository.funcaoDelete(id)

      if (!repositoryResponse.success)
        throw new Error(repositoryResponse.message)

      return {
        success: true,
        message: "Função excluída com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
