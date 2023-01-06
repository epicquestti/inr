import { connect } from "@lib/backend"
import tipoUsuarioModel from "@schema/TipoUsuario"
import usuarioModel from "@schema/Usuario"
import { genSaltSync, hashSync } from "bcrypt"
import { sign } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import getConfig from "next/config"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { serverRuntimeConfig } = getConfig()

  await connect()

  let typeUser = await tipoUsuarioModel.findOne({
    super: true
  })

  if (!typeUser)
    typeUser = await tipoUsuarioModel.insertOne({ super: true, text: "root" })

  let admUser = await usuarioModel.findOne({
    nome: "admin",
    email: "admin"
  })

  if (!admUser) {
    const s = await genSaltSync(10)
    const hash = await hashSync("123", s)
    admUser = await usuarioModel.insertOne({
      email: "admin",
      senha: hash,
      nome: "admin",
      tipoUsuario: typeUser._id,
      createdAt: new Date()
    })
  }

  const objectToHash = {
    _id: admUser._id,
    nome: admUser.nome,
    tipo: { _id: typeUser._id, tipo: typeUser.text }
  }

  const token = sign(objectToHash, serverRuntimeConfig.jwt_key, {})

  res.status(200).json({ token })
}
