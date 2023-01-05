import PublicacaoContentsModel, {
  PublicacaoContentsDocument
} from "@schema/PublicacaoContents"
import { ObjectId } from "mongodb"

export default class PublicacaoContentsRepository {
  async getPublicacaoContents(
    idBoletim: ObjectId
  ): Promise<PublicacaoContentsDocument[]> {
    try {
      return PublicacaoContentsModel.find({
        idBoletim: idBoletim
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteAllPublicacaoContents(idBoletim: ObjectId): Promise<number> {
    try {
      const response = await PublicacaoContentsModel.deleteMany({
        idBoletim: idBoletim
      })

      return response.deletedCount
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createManyPublicacaoContents(
    params: {
      title: string
      tipo: string
      idBoletim: ObjectId
      url?: string | undefined
    }[]
  ): Promise<PublicacaoContentsDocument[]> {
    try {
      return await PublicacaoContentsModel.insertMany(params)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
