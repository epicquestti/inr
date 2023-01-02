import PublicacaoModel, { PublicacaoDocument } from "@schema/Publicacao"

export default class PublicacaoRepository {
  async getPublicacaoByPublicId(
    _id: number,
    tipo: number
  ): Promise<PublicacaoDocument | null> {
    try {
      return PublicacaoModel.findOne({
        publicId: _id,
        "type.id": tipo
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
