import { z } from "zod"

export const getAtualizacoesById = z.object({
  id: z
    .string({
      invalid_type_error: "id prepcisa ser uma string",
      required_error: "id é obrigatório."
    })
    .min(3)
    .max(100)
})

export type getAtualizacoesByIdInput = z.input<typeof getAtualizacoesById>
export type getAtualizacoesByIdOutput = z.output<typeof getAtualizacoesById>
