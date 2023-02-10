import { ObjectId } from "mongodb"
import { z } from "zod"

export const usuarioSaveSchema = z.object({
  _id: z
    .string({
      invalid_type_error: "ID deve ser uma string"
    })
    .transform(id => new ObjectId(id.trim()))
    .optional(),
  email: z.string({
    invalid_type_error: "E-mail deve ser uma string.",
    required_error: "E-mail é obrigatório."
  }),
  senha: z.string({
    invalid_type_error: "Senha deve ser uma string.",
    required_error: "Senha é obrigatória."
  }),
  tipoUsuario: z
    .string({
      invalid_type_error: "Tipo de Usuário deve ser uma string.",
      required_error: "Tipo de Usuário é obrigatório."
    })
    .transform(id1 => new ObjectId(id1))
})

export type usuarioSaveInput = z.input<typeof usuarioSaveSchema>
export type usuarioSaveOutput = z.output<typeof usuarioSaveSchema>
