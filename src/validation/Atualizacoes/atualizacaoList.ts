import { z } from "zod"

export const atualizacaoListSchema = z.object({
  version: z
    .string({
      invalid_type_error: "version prepcisa ser uma string",
      required_error: "version é obrigatório."
    })
    .max(3, { message: "max3" })
    .transform(version => parseInt(version)),
  major: z
    .string({
      invalid_type_error: "major prepcisa ser uma string",
      required_error: "major é obrigatório."
    })
    .max(3)
    .transform(major => parseInt(major)),
  minor: z
    .string({
      invalid_type_error: "minor prepcisa ser uma string",
      required_error: "minor é obrigatório."
    })

    .max(3)
    .transform(minor => parseInt(minor)),
  severity: z
    .string({
      invalid_type_error: "severity prepcisa ser uma string",
      required_error: "severity é obrigatório."
    })
    .min(3)
    .max(100),
  limit: z
    .string({
      invalid_type_error: "limit prepcisa ser uma string",
      required_error: "limit é obrigatório."
    })
    .min(1)
    .max(3)
    .transform(limit => parseInt(limit)),
  page: z
    .string({
      invalid_type_error: "page prepcisa ser uma string",
      required_error: "page é obrigatório."
    })
    .min(1)
    .max(3)
    .transform(page => parseInt(page))
})

export type atualizacaoListInput = z.input<typeof atualizacaoListSchema>
export type atualizacaoListOutput = z.output<typeof atualizacaoListSchema>
