import PublicacaoModel, { PublicacaoDocument } from "@schema/Publicacao"
import { ObjectId } from "mongodb"

export default class PublicacaoRepository {
  async getPublicacaoById(_id: ObjectId): Promise<PublicacaoDocument | null> {
    try {
      return PublicacaoModel.findOne({
        _id: _id
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
