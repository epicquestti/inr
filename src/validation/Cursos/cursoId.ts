import { ObjectId } from "mongodb"
import { z } from "zod"

export const cursoDeleteSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID do Curso deve ser uma string.",
      required_error: "ID do Curso é obrigatório."
    })
    .transform(value => new ObjectId(value))
})

export type cursoIdInput = z.input<typeof cursoDeleteSchema>
export type cursoIdOutput = z.output<typeof cursoDeleteSchema>
