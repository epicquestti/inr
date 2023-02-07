import { connect } from "@lib/backend"
import tipoUsuarioModel from "@schema/TipoUsuario"
import { NextApiRequest, NextApiResponse } from "next"

export default async function searchTipoUsuario(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.log(req.body)

  try {
    const { searchText, page, rowsperpage } = req.body

    await connect()

    const list = await tipoUsuarioModel.find(
      {
        nome: {
          $regex: ".*" + searchText + ".*",
          $options: "i"
        }
      },
      { limit: rowsperpage, skip: rowsperpage * page }
    )
    console.log(list)

    const count = await tipoUsuarioModel.countDocuments({
      nome: {
        $regex: ".*" + searchText + ".*",
        $options: "i"
      }
    })

    return res.status(200).send({
      success: true,
      data: {
        list,
        count
      }
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
