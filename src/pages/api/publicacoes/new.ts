import connect from "@lib/database"
import PublicacaoModel from "@schema/Publicacao"
import PublicacaoContentsModel from "@schema/PublicacaoContents"
import PublicIdentifierModel from "@schema/PublicIdentifier"
import { NextApiRequest, NextApiResponse } from "next"

export default async function novoPublicacao(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const conn = await connect()
  try {
    const {
      method,
      body: { titulo, tipo, conteudoList }
    } = req
    if (method === "POST") {
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

      if (conteudoList.length <= 0) {
        res.status(200).send({
          success: false,
          message: "conteúdo não pode ser vazío."
        })
      }

      const PublicIdentifier = await PublicIdentifierModel.findById(
        "62326994a82afd8df5002a7e"
      )

      if (PublicIdentifier) {
        const newPublicId =
          tipo === 1
            ? PublicIdentifier.boletim + 1
            : PublicIdentifier.classificador + 1

        const newPublic = await PublicacaoModel.create({
          publicId: newPublicId,
          title: titulo,
          type: {
            id: tipo,
            text: tipo === 1 ? "Boletim" : "Classificador"
          },
          createdAt: new Date().setHours(new Date().getHours() - 3),
          aproved: false,
          published: false
        })

        for (let i = 0; i < conteudoList.length; i++) {
          try {
            await PublicacaoContentsModel.create({
              title: conteudoList[i].titulo,
              url: conteudoList[i].url,
              tipo: conteudoList[i].tipo,
              idBoletim: newPublic._id
            })
          } catch (error) {
            console.log(error)
          }
        }

        if (tipo === 1) PublicIdentifier.boletim = newPublicId
        else PublicIdentifier.classificador = newPublicId

        await PublicIdentifierModel.updateOne(
          {
            _id: "62326994a82afd8df5002a7e"
          },
          PublicIdentifier
        )

        res.status(200).send({
          success: true,
          message: "Publicacao Criada com sucesso.",
          data: { id: newPublic._id }
        })
      } else {
        res.status(200).send({
          success: false,
          message:
            "Configuração iniciais iniciais ausentes. acione um Administrador."
        })
      }
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
