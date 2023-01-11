import { z } from "zod"

export const salvarAtualizacao = z.object({
  id: z
    .string({
      invalid_type_error: "id prepcisa ser uma string"
    })
    .nullable(),
  version: z
    .string({
      required_error: "version é obrigatório.",
      invalid_type_error: "verion precisa ser enviado como uma string"
    })
    .transform(version => parseInt(version)),
  major: z
    .string({
      required_error: "major é obrigatório.",
      invalid_type_error: "major precisa ser enviado como uma string"
    })
    .transform(major => parseInt(major)),
  minor: z
    .string({
      required_error: "minor é obrigatório.",
      invalid_type_error: "minor precisa ser enviado como uma string"
    })
    .transform(minor => parseInt(minor)),
  severity: z.string({
    required_error: "severity é obrigatório.",
    invalid_type_error: "severity precisa ser enviado como uma string"
  }),
  link: z.string({
    required_error: "link é obrigatório.",
    invalid_type_error: "link precisa ser enviado como uma string"
  })
})

export type salvarAtualizacaoInput = z.input<typeof salvarAtualizacao>
export type salvarAtualizacaoOutput = z.output<typeof salvarAtualizacao>
