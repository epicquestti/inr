import autorModel, { autorDocument } from "@schema/Autor"
import { autorSaveOutput } from "@validation/Autor/autorSave"
import { ObjectId } from "mongodb"

export default class AutorRepository {
  async autorCreate(params: autorSaveOutput): Promise<autorDocument | null> {
    return await autorModel.insertOne({
      nome: params.nome,
      foto: params.foto,
      curriculo: params.curriculo
    })
  }

  async autorUpdate(params: autorSaveOutput): Promise<number> {
    const dbResponse = await autorModel.updateOne(
      { _id: params._id },
      {
        $set: {
          curriculo: params.curriculo,
          foto: params.foto,
          nome: params.nome
        }
      }
    )

    return dbResponse.modifiedCount
  }

  async autorGetByNome(params: string): Promise<autorDocument | null> {
    return await autorModel.findOne({
      nome: params
    })
  }

  async autorGetById(id: ObjectId): Promise<autorDocument | null> {
    console.log(id)

    return await autorModel.findOne({
      _id: id
    })
  }

  async autorDelete(id: ObjectId): Promise<number | null> {
    const dbResponse = await autorModel.deleteOne({
      _id: id
    })

    return dbResponse.deletedCount
  }

  async autorGetAll(): Promise<autorDocument[] | null> {
    return await autorModel.find({})
  }
}
