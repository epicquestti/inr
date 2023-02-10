import { ObjectId } from "mongodb"
import { z } from "zod"

export const usuarioIdSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID deve ser uma string.",
      required_error: "ID é obrigatório."
    })
    .transform(id => new ObjectId(id.trim()))
})

export type usuarioIdInput = z.input<typeof usuarioIdSchema>
export type usuarioIdOutput = z.output<typeof usuarioIdSchema>
