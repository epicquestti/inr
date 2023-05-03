import { z } from "zod"
export const newFuncaoValidation = z.object({
  nome: z
    .string({
      invalid_type_error: "nome prepcisa ser uma string",
      required_error: "nome é obrigatório."
    })
    .min(3)
    .max(100),
  label: z
    .string({
      invalid_type_error: "label prepcisa ser uma string",
      required_error: "label é obrigatório."
    })
    .min(3)
    .max(30),
  posicao: z
    .string({
      invalid_type_error: "posicao prepcisa ser uma string",
      required_error: "posicao é obrigatório."
    })
    .min(3)
    .max(16),
  root: z
    .string({
      invalid_type_error: "root prepcisa ser uma string",
      required_error: "root é obrigatório."
    })
    .min(3)
    .max(200),
  icone: z
    .string({
      invalid_type_error: "icone prepcisa ser uma string",
      required_error: "icone é obrigatório."
    })
    .min(3)
    .max(20)
})
export type newFuncaoController = z.input<typeof newFuncaoValidation>
export type newFuncaoService = z.output<typeof newFuncaoValidation>
