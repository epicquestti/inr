import { connect } from "@lib/backend/database"
import PublicacaoModel from "@schema/Publicacao"
import { NextApiRequest, NextApiResponse } from "next"

type publicacoesSerialisedList = {
  _id: any
  title: string
  type: string
  createdAt: string
  aproved: string
  published: string
  updatedAt: Date | undefined
  aprovedAt: Date | undefined
  publishedAt: Date | undefined
}[]

export default async function Search(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      method,
      query: { text, tipo, rowsPerPage, page }
    } = req

    const parsedRowsPerPage = rowsPerPage ? parseInt(rowsPerPage.toString()) : 5
    const parsedPage = page ? parseInt(page.toString()) : 0
    const offset = parsedRowsPerPage * parsedPage
    const parsedTitle = text ? text : ""

    await connect()

    const tipoNumero: number = tipo && tipo === "Boletim" ? 1 : 2

    const count = await PublicacaoModel.countDocuments({
      $and: [
        {
          title: {
            $regex: new RegExp("^" + parsedTitle, "i")
          }
        }
      ]
    })

    const publicacaoList = await PublicacaoModel.find({
      title: {
        $regex: new RegExp("^" + parsedTitle, "i")
      }
    })

    const response: publicacoesSerialisedList = []

    for (let i = 0; i < publicacaoList.length; i++) {
      response.push({
        _id: publicacaoList[i]._id,
        title: publicacaoList[i].title,
        type: publicacaoList[i].type?.text || "",
        createdAt: publicacaoList[i].createdAt.toLocaleDateString(),
        aproved: publicacaoList[i].aproved ? "APROVADO" : "Ñ APROVADO",
        published: publicacaoList[i].published ? "PUBLICADO" : "Ñ PUBLICADO",
        updatedAt: publicacaoList[i].updatedAt,
        aprovedAt: publicacaoList[i].aprovedAt,
        publishedAt: publicacaoList[i].publishedAt
      })
    }

    res.status(200).send({
      success: true,
      message: "Publicações encontradas:",
      data: {
        publicacoes: response,
        count: count
      }
    })
  } catch (error: any) {
    console.log(error)
    res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
