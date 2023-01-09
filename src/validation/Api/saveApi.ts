import { ObjectId } from "mongodb"
import { z } from "zod"

export const saveApiSchema = z.object({
  _id: z
    .string()
    .nullable()
    .nullish()
    .transform(_id => (_id ? new ObjectId(_id) : _id)),
  url: z.string({
    invalid_type_error: "url precisa ser uma string",
    required_error: "url é obrigatório"
  }),
  metodo: z.string({
    invalid_type_error: "metodo precisa ser uma string",
    required_error: "metodo é obrigatório"
  }),
  tipo: z.string({
    invalid_type_error: "tipo precisa ser uma string",
    required_error: "tipo é obrigatório"
  })
})

export type saveApiInput = z.input<typeof saveApiSchema>
export type saveApiOutput = z.output<typeof saveApiSchema>
