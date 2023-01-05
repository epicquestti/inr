import { ObjectId } from "mongodb"
import { z } from "zod"

export const updatePublicacao = z.object({
  _id: z
    .string({
      invalid_type_error: "id prepcisa ser uma string",
      required_error: "id é obrigatório."
    })
    .transform(id => new ObjectId(id)),
  titulo: z
    .string({
      invalid_type_error: "titulo prepcisa ser uma string",
      required_error: "titulo é obrigatório."
    })
    .min(2),
  tipo: z
    .string({
      invalid_type_error: "tipo prepcisa ser uma string",
      required_error: "tipo é obrigatório."
    })
    .transform(tipo =>
      parseInt(tipo) === 1
        ? { id: parseInt(tipo), text: "Boletim" }
        : { id: parseInt(tipo), text: "Classificador" }
    ),
  pubId: z
    .string({
      invalid_type_error: "pubId prepcisa ser uma string",
      required_error: "pubId é obrigatório."
    })
    .transform(pubId => parseInt(pubId)),
  conteudoList: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
      tipo: z.string(),
      idBoletim: z
        .string({
          invalid_type_error: "tipo prepcisa ser uma string",
          required_error: "tipo é obrigatório."
        })
        .transform(idBoletim => new ObjectId(idBoletim))
    })
  )
})

export type updatePublicacaoInput = z.input<typeof updatePublicacao>
export type updatePublicacaoOutput = z.output<typeof updatePublicacao>
