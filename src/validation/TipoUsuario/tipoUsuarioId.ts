import { ObjectId } from "mongodb"
import { z } from "zod"

export const tipoUsuarioIdSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID deve ser uma string.",
      required_error: "ID é obrigatório."
    })
    .transform(id => new ObjectId(id))
})

export type tipoUsuarioIdInput = z.input<typeof tipoUsuarioIdSchema>
export type tipoUsuarioIdOutput = z.output<typeof tipoUsuarioIdSchema>
