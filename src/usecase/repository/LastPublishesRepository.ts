import LastPublishesModel, { LastPublishesDocument } from "@schema/LasPublishes"

export default class LastPublishesRepository {
  async getLastPublishes(): Promise<LastPublishesDocument[]> {
    try {
      return LastPublishesModel.find({})
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
