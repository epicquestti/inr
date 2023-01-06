import { z } from "zod"

export const authenticationPanelContingencySchema = z.object({
  credential: z
    .string({
      invalid_type_error: "credential prepcisa ser uma string",
      required_error: "credential é obrigatório."
    })
    .uuid()
})

export type authenticationPanelContingencyInput = z.input<
  typeof authenticationPanelContingencySchema
>
export type authenticationPanelContingencyOutput = z.output<
  typeof authenticationPanelContingencySchema
>
