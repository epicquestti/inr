import { ObjectId } from "mongodb"
import { z } from "zod"

export const cursoUpdateSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID do Curso deve ser uma string."
    })
    .transform(value => new ObjectId(value)),
  nome: z
    .string({
      invalid_type_error: "Nome do Curso deve ser uma string.",
      required_error: "Nome do Curso é obrigatório."
    })
    .min(2, { message: "Nome do Curso deve ter no mínimo 2 caracteres." })
    .max(1000, {
      message: "Nome do Curso deve ter no máximo 1000 caracteres."
    }),
  url: z
    .string({
      invalid_type_error: "URL do Curso deve ser uma string.",
      required_error: "URL do Curso é obrigatório."
    })
    .min(2, { message: "URL do Curso deve ter no mínimo 2 caracteres." })
    .max(1000, { message: "URL do Curso deve ter no máximo 1000 caracteres." }),
  active: z.boolean({
    invalid_type_error: "Ativo/Inativo deve ser um booleano.",
    required_error: "Ativo/Inativo é obrigatório."
  }),
  destaque: z
    .boolean({
      invalid_type_error: "Destaque deve ser um booleano."
    })
    .optional()
})

export type cursoUpdateInput = z.input<typeof cursoUpdateSchema>
export type cursoUpdateOutput = z.output<typeof cursoUpdateSchema>
