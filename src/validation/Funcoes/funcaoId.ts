import { ObjectId } from "mongodb"
import { z } from "zod"

export const funcaoIdSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID deve ser uma string.",
      required_error: "ID é obrigatório."
    })
    .transform(id => new ObjectId(id))
})

export type funcaoIdInput = z.input<typeof funcaoIdSchema>
export type funcaoIdOutput = z.output<typeof funcaoIdSchema>
