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
}
