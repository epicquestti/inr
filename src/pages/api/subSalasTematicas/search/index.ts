import { connect } from "@lib/backend"
import subSalasTematicasModel from "@schema/SubSalasTematicas"
import { NextApiRequest, NextApiResponse } from "next"

export default async function searchSubSalasTematicas(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { searchText, page, rowsperpage } = req.body

    await connect()

    const list = await subSalasTematicasModel.find(
      {
        nome: {
          $regex: ".*" + searchText + ".*",
          $options: "i"
        }
      },
      { limit: rowsperpage, skip: rowsperpage * page }
    )
    const count = await subSalasTematicasModel.countDocuments({
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
