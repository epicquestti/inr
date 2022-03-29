import connect from "@lib/database"
import PublicacaoModel from "@schema/Publicacao"
import PublicacaoContentsModel from "@schema/PublicacaoContents"
import { NextApiRequest, NextApiResponse } from "next"

export default async function updatePublicacao(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await connect()

    const {
      method,
      body: { titulo, tipo, pubId, conteudoList },
      query: { id }
    } = req

    if (!id) {
      return res.status(200).send({
        success: false,
        message: "Identificador ausente."
      })
    }

    if (method === "PUT") {
      if (!titulo) {
        res.status(200).send({
          success: false,
          message: "Título não pode ser vazío."
        })
      }

      if (!tipo) {
        res.status(200).send({
          success: false,
          message: "tipo não pode ser vazío."
        })
      }

      if (!pubId) {
        res.status(200).send({
          success: false,
          message: "Public Id não pode ser vazío."
        })
      }

      if (conteudoList.length <= 0) {
        res.status(200).send({
          success: false,
          message: "conteúdo não pode ser vazío."
        })
      }

      const updated = await PublicacaoModel.updateOne(
        { _id: id },
        {
          publicId: pubId,
          title: titulo,
          type: {
            id: tipo,
            text: tipo === 1 ? "Boletim" : "Classificador"
          },
          aproved: false,
          updatedAt: new Date(new Date().setHours(new Date().getHours() - 3))
        }
      )

      await PublicacaoContentsModel.deleteMany({
        idBoletim: id
      })

      for (let i = 0; i < conteudoList.length; i++) {
        try {
          await PublicacaoContentsModel.create({
            title: conteudoList[i].titulo,
            url: conteudoList[i].url,
            tipo: conteudoList[i].tipo,
            idBoletim: id
          })
        } catch (error) {
          console.log(error)
          res.status(200).send({
            success: false,
            message: "Erro ao inserir o conteúdo do boletim."
          })
        }
      }

      res.status(200).send({
        success: true,
        message: "Publicacao editada com sucesso.",
        data: updated
      })
    } else {
      res.status(200).send({
        success: false,
        message: "Method not Allowed."
      })
    }
  } catch (error) {
    res.status(200).send({
      success: false,
      message: JSON.stringify(error)
    })
  }
}
