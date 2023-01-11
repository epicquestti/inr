import { connect } from "@lib/backend"
import Reportes from "@schema/Reportes"
import { NextApiRequest, NextApiResponse } from "next"

export default async function searchReportes(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { searchText, page, rowsperpage } = req.body

    await connect()

    const list = await Reportes.find(
      {
        $or: [
          {
            nome: {
              $regex: ".*" + searchText + ".*",
              $options: "i"
            }
          },
          {
            email: {
              $regex: ".*" + searchText + ".*",
              $options: "i"
            }
          },
          {
            ddd: {
              $regex: ".*" + searchText + ".*",
              $options: "i"
            }
          },
          {
            fone: {
              $regex: ".*" + searchText + ".*",
              $options: "i"
            }
          },
          {
            version: {
              $regex: ".*" + searchText + ".*",
              $options: "i"
            }
          }
        ]
      },
      {
        sort: {
          createdAt: "desc"
        },
        limit: rowsperpage,
        skip: rowsperpage * page
      }
    )

    const count = await Reportes.countDocuments({
      $or: [
        {
          nome: {
            $regex: ".*" + searchText + ".*",
            $options: "i"
          }
        },
        {
          email: {
            $regex: ".*" + searchText + ".*",
            $options: "i"
          }
        },
        {
          ddd: {
            $regex: ".*" + searchText + ".*",
            $options: "i"
          }
        },
        {
          fone: {
            $regex: ".*" + searchText + ".*",
            $options: "i"
          }
        },
        {
          version: {
            $regex: ".*" + searchText + ".*",
            $options: "i"
          }
        }
      ]
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
