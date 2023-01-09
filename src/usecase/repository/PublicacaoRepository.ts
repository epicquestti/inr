import PublicacaoModel, { PublicacaoDocument } from "@schema/Publicacao"
import { ObjectId } from "mongodb"

export default class PublicacaoRepository {
  async getPublicacaoByPublicId(
    _id: number,
    tipo: number
  ): Promise<PublicacaoDocument | null> {
    try {
      return PublicacaoModel.findOne({
        publicId: _id,
        "type.text": tipo
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getPublicacaoById(_id: ObjectId): Promise<PublicacaoDocument | null> {
    try {
      return PublicacaoModel.findById(_id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updatePublicacao(params: {
    _id: ObjectId
    publicId: number
    title: string
    tipo: { id: number; text: string }
  }): Promise<number> {
    const response = await PublicacaoModel.updateOne(
      {
        _id: params._id
      },
      {
        $set: {
          publicId: params.publicId,
          title: params.title,
          type: params.tipo,
          aproved: false,
          updatedAt: new Date(new Date().setHours(new Date().getHours() - 3))
        }
      }
    )

    return response.modifiedCount
  }
}
