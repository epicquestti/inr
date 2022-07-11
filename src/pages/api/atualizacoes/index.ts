import connect from "@lib/database"
import ApplicationVersions, {
  applicationVersions
} from "@schema/ApplicationVersions"
import { FilterQuery } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export default async function searchAtualizacoes(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      method,
      query: { version, major, minor, severity, rowsPerPage, page }
    } = req

    const parsedRowsPerPage = rowsPerPage ? parseInt(rowsPerPage.toString()) : 5
    const parsedPage = page ? parseInt(page.toString()) : 0
    const offset = parsedRowsPerPage * parsedPage
    await connect()

    const filter: FilterQuery<applicationVersions> = {}

    if (typeof version === "number" && version > 0)
      filter.$and?.push({ version })
    if (typeof major === "number" && major > 0) filter.$and?.push({ major })
    if (typeof minor === "number" && minor > 0) filter.$and?.push({ minor })
    if (severity) filter.$and?.push({ severity })

    const count = await ApplicationVersions.count(filter)
    const updateList = await ApplicationVersions.find(filter)
      .sort({ version: "asc", major: "asc", minor: "asc" })
      .limit(parsedRowsPerPage)
      .skip(offset)

    res.status(200).send({
      success: true,
      message: "Atualizações encontradas:",
      data: {
        atualizacoes: updateList,
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
