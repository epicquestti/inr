import { ObjectId } from "mongodb"
import { z } from "zod"

export const autorIdSchema = z.object({
  _id: z
    .string({
      invalid_type_error: "ID deve ser uma string.",
      required_error: "ID é obrigatório."
    })
    .transform(id => new ObjectId(id))
})

export type autorIdInput = z.input<typeof autorIdSchema>
export type autorIdOutput = z.output<typeof autorIdSchema>
