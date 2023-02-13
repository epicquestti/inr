import { connect } from "@lib/backend"
import usuarioModel from "@schema/Usuario"
import { NextApiRequest, NextApiResponse } from "next"

export default async function searchUsuarios(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.log("req.body", req.body)

  try {
    const { searchText, page, rowsperpage } = req.body

    await connect()

    const list = await usuarioModel.find(
      {
        email: {
          $regex: ".*" + searchText + ".*",
          $options: "i"
        }
      },
      { limit: rowsperpage, skip: rowsperpage * page }
    )
    const count = await usuarioModel.countDocuments({
      email: {
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
