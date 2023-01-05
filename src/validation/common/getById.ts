import { ObjectId } from "mongodb"
import { z } from "zod"

export const getById = z.object({
  id: z
    .string({
      invalid_type_error: "id prepcisa ser uma string",
      required_error: "id é obrigatório."
    })
    .min(3)
    .max(100)
    .transform(id => new ObjectId(id))
})

export type getByIdInput = z.input<typeof getById>
export type getByIdOutput = z.output<typeof getById>
