import { defaultResponse } from "@lib/types/defaultResponse"
import NoticiaRepository from "@usecase/repository/NoticiaRepository"
import { ObjectId } from "mongodb"
import INoticiasService from "./INoticiasService"

export default class NoticiasService implements INoticiasService {
  constructor(private _noticiasRepository: NoticiaRepository) {}

  async noticiaCreate(params: {
    _id?: ObjectId | undefined
    imagemDestaque?: string | undefined
    titulo: string
    tituloSecundario: string
    fonte: string
    dataPublicacaoFonte: Date | null
    conteudoTexto: string
    conteudoHtml: string
    salasTematicas: ObjectId[]
  }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }

  async noticiaUpdate(params: {
    _id?: ObjectId | undefined
    imagemDestaque?: string | undefined
    titulo: string
    tituloSecundario: string
    fonte: string
    dataPublicacaoFonte: Date | null
    conteudoTexto: string
    conteudoHtml: string
    salasTematicas: ObjectId[]
  }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }

  async noticiaGetById(params: { id: ObjectId }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }

  async noticiaDelete(params: { id: ObjectId }): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
}
