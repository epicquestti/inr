import connect from "@lib/database"
import Updates from "@schema/Updates"

import { NextApiRequest, NextApiResponse } from "next"

export default async function saveAtualizacao(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {
      body: { id, version, major, minor, severity, link }
    } = req

    console.log(version)

    if (version === "" || version === null)
      throw new Error("Versão não pode ser 0 ou nulo")
    if (major === "" || major === null)
      throw new Error("Major não pode ser 0 ou nulo")
    if (minor === "" || minor === null)
      throw new Error("minor não pode ser 0 ou nulo")
    if (severity === "" || severity === null)
      throw new Error("Selecione a severidade.")
    if (link === "" || link === null) throw new Error("insira o link.")

    await connect()

    if (!id) {
      const verify = await Updates.findOne({
        $and: [
          {
            version: parseInt(version.toString())
          },
          {
            major: parseInt(major.toString())
          },
          {
            minor: parseInt(minor.toString())
          }
        ]
      })

      if (verify) throw new Error("Versão ja cadastrada.")

      const nv = {
        version: parseInt(version.toString()),
        major: parseInt(major.toString()),
        minor: parseInt(minor.toString()),
        severity: severity,
        vigent: false,
        link: link
      }

      const newVersion = await Updates.create(nv)

      res.status(200).send({
        success: true,
        message: "Atualização Criada.",
        data: newVersion
      })
    } else {
      const justPublished = await Updates.findById(id)

      if (justPublished?.vigent)
        throw new Error("Esta versão ja voi publicada e não pode ser alterada.")

      const verify = await Updates.findOne({
        $and: [
          {
            version: parseInt(version.toString())
          },
          {
            major: parseInt(major.toString())
          },
          {
            minor: parseInt(minor.toString())
          },
          {
            id: {
              $ne: id
            }
          }
        ]
      })

      if (verify) throw new Error("Versão ja cadastrada.")

      const updatedVersion = await Updates.findOneAndUpdate(
        {
          id: id
        },
        {
          version: parseInt(version.toString()),
          major: parseInt(major.toString()),
          minor: parseInt(minor.toString()),
          severity: severity,
          link: link
        }
      )

      res.status(200).send({
        success: true,
        message: "atualização Editada.",
        data: updatedVersion
      })
    }
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
