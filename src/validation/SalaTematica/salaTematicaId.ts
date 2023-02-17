import { ObjectId } from "mongodb"
import { z } from "zod"

export const salaTematicaIdSchema = z.object({
  _id: z
    .string({
      invalid_type_error: "ID deve ser uma string.",
      required_error: "ID é obrigatório."
    })
    .transform(id => new ObjectId(id))
    .optional()
})

export type salaTematicaIdInput = z.input<typeof salaTematicaIdSchema>
export type salaTematicaIdOutput = z.output<typeof salaTematicaIdSchema>
