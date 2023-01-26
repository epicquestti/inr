import { ObjectId } from "mongodb"
import { z } from "zod"

export const funcaoSaveSchema = z.object({
  nome: z.string({
    invalid_type_error: "Nome deve ser uma string.",
    required_error: "Nome é obrigatório."
  }),
  root: z.string({
    invalid_type_error: "Root deve ser uma string.",
    required_error: "Root é obrigatório."
  }),
  icone: z.string({
    invalid_type_error: "Ícone deve ser uma string.",
    required_error: "Ícone é obrigatório."
  }),
  nivel: z.string({
    invalid_type_error: "Nível deve ser uma string.",
    required_error: "Nível é obrigatório."
  }),
  tipo: z.string({
    invalid_type_error: "Tipo deve ser uma string.",
    required_error: "Tipo é obrigatório."
  }),
  // tipoUsuarioAutorizado: z
  //   .array(
  //     z
  //       .string({
  //         invalid_type_error: "Tipo deve ser uma string."
  //       })
  //       .transform(id => new ObjectId(id))
  //   )
  //   .optional(),
  // acoes: z
  //   .array(
  //     z.string({
  //       invalid_type_error: "Ações deve ser uma Array de strings."
  //     })
  //   )
  //   .optional(),
  _id: z
    .string({
      invalid_type_error: "ID deve ser uma string."
    })
    .transform(id => new ObjectId(id))
    .optional()
  // apisRelacionadas: z
  //   .array(
  //     z.string({
  //       invalid_type_error: "APIs Relacionadas deve ser uma array de strings."
  //     })
  //   )
  //   .optional()
})

export type funcaoSaveInput = z.input<typeof funcaoSaveSchema>
export type funcaoSaveOutput = z.output<typeof funcaoSaveSchema>
