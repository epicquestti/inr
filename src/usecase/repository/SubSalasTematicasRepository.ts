import subSalasTematicasModel, {
  subSalasTematicasDocument
} from "@schema/SubSalasTematicas"
import { subSalaTematicaSaveOutput } from "@validation/SubSalaTematica/subSalaTematicaSave"
import { ObjectId } from "mongodb"

export default class SubSalasTematicasRepository {
  async subSalasTematicasCreate(
    params: subSalaTematicaSaveOutput
  ): Promise<subSalasTematicasDocument | null> {
    return await subSalasTematicasModel.insertOne({
      nome: params.nome
    })
  }

  async subSalasTematicasUpdate(
    params: subSalaTematicaSaveOutput
  ): Promise<number> {
    const dbResponse = await subSalasTematicasModel.updateOne(
      {
        _id: params._id
      },
      {
        $set: {
          nome: params.nome
        }
      }
    )

    return dbResponse.modifiedCount
  }

  async subSalasTematicasDelete(id: ObjectId): Promise<number> {
    const dbResponse = await subSalasTematicasModel.deleteOne({
      _id: id
    })

    return dbResponse.deletedCount
  }

  async subSalasTematicasGetById(
    _id: ObjectId
  ): Promise<subSalasTematicasDocument | null> {
    return await subSalasTematicasModel.findOne({
      _id: _id
    })
  }

  async subSalasTematicasList(): Promise<subSalasTematicasDocument[] | null> {
    return null
  }

  async subSalasTematicasGetByNome(
    nome: string
  ): Promise<subSalasTematicasDocument | null> {
    return await subSalasTematicasModel.findOne({
      nome: nome
    })
  }
}
