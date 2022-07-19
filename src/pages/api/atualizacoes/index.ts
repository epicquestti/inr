import connect from "@lib/database"
import Updates from "@schema/Updates"

import { FilterQuery } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

interface applicationVersionsInterface {
  version: number
  major: number
  minor: number
  severity: "normal" | "urgent"
  link: string
  vigent: boolean
  publishAt?: Date
  createdAt?: Date
}

export default async function searchAtualizacoes(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      query: { version, major, minor, severity, rowsPerPage, page }
    } = req

    const parsedRowsPerPage = rowsPerPage ? parseInt(rowsPerPage.toString()) : 5
    const parsedPage = page ? parseInt(page.toString()) : 0
    const offset = parsedRowsPerPage * parsedPage
    await connect()

    const filter: FilterQuery<applicationVersionsInterface> = {}

    if (version || major || minor || severity) filter.$and = []
    if (version) filter.$and?.push({ version: parseInt(version.toString()) })
    if (major) filter.$and?.push({ major: parseInt(major.toString()) })
    if (minor) filter.$and?.push({ minor: parseInt(minor.toString()) })
    if (severity) filter.$and?.push({ severity })

    const count = await Updates.count(filter)
    const updateList = await Updates.find(filter)
      .sort({ version: "asc", major: "asc", minor: "asc" })
      .limit(parsedRowsPerPage)
      .skip(offset)

    const response: any[] = []

    for (let i = 0; i < updateList.length; i++) {
      response.push({
        id: updateList[i]._id,
        version: updateList[i].version,
        major: updateList[i].major,
        minor: updateList[i].minor,
        severity: updateList[i].severity,
        link: updateList[i].link
      })
    }

    res.status(200).send({
      success: true,
      message: "Atualizações encontradas:",
      data: {
        atualizacoes: response,
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
