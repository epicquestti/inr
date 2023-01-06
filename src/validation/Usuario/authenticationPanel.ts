import { z } from "zod"

export const authenticationPanel = z.object({
  email: z.string({
    invalid_type_error: "email prepcisa ser uma string",
    required_error: "email é obrigatório."
  }),
  // .email({
  //   message: "Email inválido"
  // })
  // .min(6)
  // .max(120)
  senha: z
    .string({
      required_error: "senha é obrigatório.",
      invalid_type_error: "senha precisa ser string"
    })
    .min(3)
    .max(50),
  keepConnected: z
    .string({
      required_error: "keepConnected é obrigatório.",
      invalid_type_error: "keepConnected precisa ser enviado como uma string"
    })
    .transform(kc => kc === "true")
})

export type authenticationPanelInput = z.input<typeof authenticationPanel>
export type authenticationPanelOutput = z.output<typeof authenticationPanel>
