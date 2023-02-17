import salaTematicaModel, { salaTematicaDocument } from "@schema/SalaTematica"
import { salaTematicaSaveOutput } from "@validation/SalaTematica/salaTematicaSave"
import { ObjectId } from "mongodb"

export default class SalaTematicaRepository {
  async salaTematicaCreate(
    params: salaTematicaSaveOutput
  ): Promise<salaTematicaDocument | null> {
    return await salaTematicaModel.insertOne({
      nome: params.nome
    })
  }

  async salaTematicaUpdate(params: salaTematicaSaveOutput): Promise<number> {
    const dbResponse = await salaTematicaModel.updateOne(
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

  async salaTematicaDelete(): Promise<number> {
    return 0
  }

  async salaTematicaGetById(
    id: ObjectId
  ): Promise<salaTematicaDocument | null> {
    return await salaTematicaModel.findOne({
      _id: id
    })
  }

  async salaTematicaGetByNome(
    nome: string
  ): Promise<salaTematicaDocument | null> {
    return await salaTematicaModel.findOne({
      nome: nome
    })
  }
}
