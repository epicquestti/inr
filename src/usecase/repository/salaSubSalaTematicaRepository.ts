import salaSubSalaTematicaModel from "@schema/SalaSubSalaTematica"
import { ObjectId } from "mongodb"

export default class SalaSubSalaTematicaRepository {
  async salaSubSalaTematicaRelationCreate(
    salaId: ObjectId,
    subSalaId: ObjectId
  ) {
    return await salaSubSalaTematicaModel.insertOne({
      salaTematicaId: salaId,
      subSalaTematicaId: subSalaId
    })
  }

  async salaSubSalaTematicaRelationDelete(salaId: ObjectId) {
    return await salaSubSalaTematicaModel.deleteMany({
      salaTematicaId: salaId
    })
  }
}
