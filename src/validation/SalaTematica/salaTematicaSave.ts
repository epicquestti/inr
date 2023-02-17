import { ObjectId } from "mongodb"
import { z } from "zod"

export const salaTematicaSaveSchema = z.object({
  _id: z
    .string({
      invalid_type_error: "ID deve ser uma string."
    })
    .transform(id => new ObjectId(id.trim()))
    .optional(),
  nome: z.string({
    invalid_type_error: "Nome deve ser uma string",
    required_error: "Nome é obrigatório."
  }),
  subSalasTematicas: z
    .array(
      z
        .string({
          invalid_type_error: "ID deve ser uma string.",
          required_error: "ID é obrigatório."
        })
        .transform(id => new ObjectId(id))
    )
    .optional()
})

export type salaTematicaSaveInput = z.input<typeof salaTematicaSaveSchema>
export type salaTematicaSaveOutput = z.output<typeof salaTematicaSaveSchema>
