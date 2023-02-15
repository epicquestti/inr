import { ObjectId } from "mongodb"
import { z } from "zod"

export const subSalaTematicaSaveSchema = z.object({
  _id: z
    .string({
      invalid_type_error: "ID deve ser uma string"
    })
    .transform(id => new ObjectId(id.trim()))
    .optional(),
  nome: z.string({
    invalid_type_error: "Nome deve ser uma string.",
    required_error: "Nome é obrigatório."
  })
})

export type subSalaTematicaSaveInput = z.input<typeof subSalaTematicaSaveSchema>
export type subSalaTematicaSaveOutput = z.output<
  typeof subSalaTematicaSaveSchema
>
