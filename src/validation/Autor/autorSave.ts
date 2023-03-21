import { ObjectId } from "mongodb"
import { z } from "zod"

export const autorSaveSchema = z.object({
  _id: z
    .string({
      invalid_type_error: "ID deve ser uma string."
    })
    .transform(id => new ObjectId(id.trim()))
    .optional(),
  nome: z.string({
    invalid_type_error: "Nome deve ser uma string.",
    required_error: "Nome é obrigatório."
  }),
  foto: z
    .string({
      invalid_type_error: "Foto deve ser uma string."
    })
    .optional(),
  curriculo: z.string({
    invalid_type_error: "Currículo deve ser uma string.",
    required_error: "Currículo é obrigatório."
  })
})

export type autorSaveInput = z.input<typeof autorSaveSchema>
export type autorSaveOutput = z.output<typeof autorSaveSchema>
