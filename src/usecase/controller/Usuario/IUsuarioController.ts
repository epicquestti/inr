import { defaultResponse } from "@lib/types/defaultResponse"
import { authenticationPanelInput } from "@validation/Usuario/authenticationPanel"
import { authenticationPanelContingencyInput } from "@validation/Usuario/authenticationPanelContingency"
import { usuarioSaveInput } from "@validation/Usuario/usuarioSave"

export default interface IUsuarioController {
  authenticationPanel(
    params: authenticationPanelInput
  ): Promise<defaultResponse>
  authenticationPanelContingency(
    params: authenticationPanelContingencyInput
  ): Promise<defaultResponse>
  usuarioSave(params: usuarioSaveInput): Promise<defaultResponse>
}
