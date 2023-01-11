import { connect } from "@lib/backend"
import ApiModel from "@schema/Api"
import { NextApiRequest, NextApiResponse } from "next"

export default async function searchApis(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { searchText, page, rowsperpage } = req.body

    await connect()

    const list = await ApiModel.find(
      {
        url: {
          $regex: ".*" + searchText + ".*",
          $options: "i"
        }
      },
      { limit: rowsperpage, skip: rowsperpage * page }
    )

    const count = await ApiModel.countDocuments({
      url: {
        $regex: ".*" + searchText + ".*",
        $options: "i"
      }
    })

    return res.status(200).send({
      success: true,
      data: {
        list,
        count
      },
      message: "Exibindo APIs"
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
