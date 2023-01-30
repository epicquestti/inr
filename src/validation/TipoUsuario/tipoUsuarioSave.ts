import { ObjectId } from "mongodb"
import { z } from "zod"

export const tipoUsuarioSaveSchema = z.object({
  _id: z
    .string({
      invalid_type_error: "ID deve ser uma string"
    })
    .transform(id => new ObjectId(id))
    .optional(),
  nome: z.string({
    invalid_type_error: "Nome deve ser uma string",
    required_error: "Nome é obrigatório."
  }),
  funcoes: z.array(
    z
      .string({
        invalid_type_error: "ID deve ser uma string.",
        required_error: "ID é obrigatório."
      })
      .transform(id => new ObjectId(id))
  ),
  super: z.boolean({
    invalid_type_error: "Super deve ser um booleano.",
    required_error: "Super User é obrigatório."
  })
})

export type tipoUsuarioSaveInput = z.input<typeof tipoUsuarioSaveSchema>
export type tipoUsuarioSaveOutput = z.output<typeof tipoUsuarioSaveSchema>
