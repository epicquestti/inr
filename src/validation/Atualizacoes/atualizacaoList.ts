import { z } from "zod"

export const atualizacaoListSchema = z.object({
  version: z
    .string({
      invalid_type_error: "version prepcisa ser uma string",
      required_error: "version é obrigatório."
    })
    .min(1)
    .max(3)
    .transform(version => new Number(version)),
  major: z
    .string({
      invalid_type_error: "major prepcisa ser uma string",
      required_error: "major é obrigatório."
    })
    .min(1)
    .max(3)
    .transform(major => new Number(major)),
  minor: z
    .string({
      invalid_type_error: "minor prepcisa ser uma string",
      required_error: "minor é obrigatório."
    })
    .min(1)
    .max(3)
    .transform(minor => new Number(minor)),
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
    .transform(limit => new Number(limit)),
  page: z
    .string({
      invalid_type_error: "page prepcisa ser uma string",
      required_error: "page é obrigatório."
    })
    .min(1)
    .max(3)
    .transform(page => new Number(page))
})

export type atualizacaoListInput = z.input<typeof atualizacaoListSchema>
export type atualizacaoListOutput = z.output<typeof atualizacaoListSchema>
