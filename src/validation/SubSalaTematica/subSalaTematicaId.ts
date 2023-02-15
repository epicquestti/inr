import { ObjectId } from "mongodb"
import { z } from "zod"

export const subSalaTematicaIdSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID deve ser uma string.",
      required_error: "ID é obrigatório."
    })
    .transform(id => new ObjectId(id.trim()))
})

export type subSalaTematicaIdInput = z.input<typeof subSalaTematicaIdSchema>
export type subSalaTematicaIdOutput = z.output<typeof subSalaTematicaIdSchema>
