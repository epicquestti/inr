import { ObjectId } from "mongodb"
import { z } from "zod"

export const noticiaSaveSchema = z.object({
  _id: z
    .string({
      invalid_type_error: "ID deve ser uma string."
    })
    .transform(id => new ObjectId(id.trim()))
    .optional(),
  titulo: z.string({
    invalid_type_error: "Título deve ser uma string.",
    required_error: "Título é obrigatório."
  }),
  tituloSecundario: z.string({
    invalid_type_error: "Título Secundário deve ser uma string.",
    required_error: "Título Secundário é obrigatório."
  }),
  fonte: z.string({
    invalid_type_error: "Fonte deve ser uma string.",
    required_error: "Fonte é obrigatória."
  }),
  dataPublicacaoFonte: z
    .date({
      invalid_type_error: "Data de Publicação na Fonte deve ser uma string.",
      required_error: "Data de Publicação na Fonte é obrigatória."
    })
    .nullable(),
  imagemDestaque: z
    .string({
      invalid_type_error: "Imagem de Destaque deve ser uma string."
    })
    .optional(),
  conteudoTexto: z.string({
    invalid_type_error: "Conteúdo em Texto deve ser uma string.",
    required_error: "Conteúdo em Texto é obrigatório."
  }),
  conteudoHtml: z.string({
    invalid_type_error: "Conteúdo em HTML deve ser uma string.",
    required_error: "Conteúdo em HTML é obrigatório."
  }),
  salasTematicas: z.array(
    z
      .string({
        invalid_type_error: "ID deve ser uma string.",
        required_error: "ID é obrigatório."
      })
      .optional()
      .transform(id => new ObjectId(id))
  )
})

export type noticiaSaveInput = z.input<typeof noticiaSaveSchema>
export type noticiaSaveOutput = z.output<typeof noticiaSaveSchema>
