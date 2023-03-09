import { ObjectId } from "mongodb"
import { z } from "zod"

export const noticiaIdSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID deve ser uma string.",
      required_error: "ID é obrigatório."
    })
    .transform(id => new ObjectId(id.trim()))
})

export type noticiaIdInput = z.input<typeof noticiaIdSchema>
export type noticiaIdOutput = z.output<typeof noticiaIdSchema>
