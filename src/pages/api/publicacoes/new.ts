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

      let hasPublicIdentifier = await PublicIdentifierModel.find()

      let publicIdentifier: any | null = null

      if (hasPublicIdentifier.length <= 0) {
        publicIdentifier = await PublicIdentifierModel.create({
          boletim: 0,
          classificador: 0
        })
      } else {
        publicIdentifier = hasPublicIdentifier[0]
      }

      const newPublicId =
        tipo === 1
          ? publicIdentifier.boletim + 1
          : publicIdentifier.classificador + 1

      console.log(newPublicId)

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

      if (tipo === 1) publicIdentifier.boletim = newPublicId
      else publicIdentifier.classificador = newPublicId

      await PublicIdentifierModel.updateOne(
        {
          _id: publicIdentifier._id
        },
        publicIdentifier
      )

      res.status(200).send({
        success: true,
        message: "Publicacao Criada com sucesso.",
        data: { id: newPublic._id }
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
