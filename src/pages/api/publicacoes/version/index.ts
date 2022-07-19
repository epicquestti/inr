import connect from "@lib/database"
import ApplicationVersions from "@schema/ApplicationVersions"
import { NextApiRequest, NextApiResponse } from "next"

type publicacoesSerialisedList = {
  id: any
  title: string
  type: string
  createdAt: string
  aproved: string
  published: string
  updatedAt: Date | undefined
  aprovedAt: Date | undefined
  publishedAt: Date | undefined
}[]

export default async function version(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { method } = req

    if (method !== "GET") throw new Error("Requisition needU+00b4s to be GET")

    await connect()

    const applicationVersion = await ApplicationVersions.findOne({
      vigent: true
    })

    res.status(200).send({
      success: true,
      data: applicationVersion
    })
  } catch (error) {
    console.log(error)
    res.status(200).send({
      success: false,
      message: JSON.stringify(error)
    })
  }
}
