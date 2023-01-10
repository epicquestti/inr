import { defaultResponse } from "@lib/types/defaultResponse"
import { authenticationPanelInput } from "@validation/Usuario/authenticationPanel"
import { authenticationPanelContingencyInput } from "@validation/Usuario/authenticationPanelContingency"

export default interface IUsuarioController {
  authenticationPanel(
    params: authenticationPanelInput
  ): Promise<defaultResponse>
  authenticationPanelContingency(
    params: authenticationPanelContingencyInput
  ): Promise<defaultResponse>
}
