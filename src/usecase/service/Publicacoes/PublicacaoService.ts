import { defaultResponse } from "@lib/types/defaultResponse"
import PublicacaoContentsRepository from "@usecase/repository/PublicacaoContentsRepository"
import PublicacaoRepository from "@usecase/repository/PublicacaoRepository"
import { ObjectId } from "mongodb"
import IPublicacaoService from "./IPublicacaoService"

export default class PublicacaoService implements IPublicacaoService {
  constructor(
    private _publicacaoRepository: PublicacaoRepository,
    private _publicacaoContentsRepository: PublicacaoContentsRepository
  ) {}
  async publish(params: { id: ObjectId }): Promise<defaultResponse> {
    try {
      const pub = await this._publicacaoRepository.getPublicacaoById(params.id)

      if (!pub) throw new Error("Publicação não encontrada.")

      pub.published = true
      pub.publishedAt = new Date(new Date().setHours(new Date().getHours() - 3))

      return {
        success: true,
        message: "mock"
      }
    } catch (error: any) {
      return {
        success: true,
        message: error.message
      }
    }
  }

  async update(params: {
    _id: ObjectId
    titulo: string
    tipo: { id: number; text: string }
    pubId: number
    conteudoList: {
      tipo: string
      title: string
      url: string
      idBoletim: ObjectId
    }[]
  }): Promise<defaultResponse> {
    try {
      const updatedRes = await this._publicacaoRepository.updatePublicacao({
        _id: params._id,
        publicId: params.pubId,
        title: params.titulo,
        tipo: params.tipo
      })

      if (updatedRes <= 0) throw new Error("Publicação não editada.")

      await this._publicacaoContentsRepository.deleteAllPublicacaoContents(
        params._id
      )

      const newConteudoList =
        await this._publicacaoContentsRepository.createManyPublicacaoContents(
          params.conteudoList
        )

      if (params.conteudoList.length !== newConteudoList.length)
        throw new Error("Erro ao criar conteúdo da Publicação.")

      return {
        success: true,
        data: {
          _id: params._id,
          titulo: params.titulo,
          tipo: params.tipo,
          pubId: params.pubId,
          conteudoList: newConteudoList
        },
        message: "Publicação editada com sucesso."
      }
    } catch (error: any) {
      return {
        success: true,
        message: error.message
      }
    }
  }
}
