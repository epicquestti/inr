import { defaultResponse } from "@lib/types/defaultResponse"
import { authenticationPanelOutput } from "@validation/Usuario/authenticationPanel"
import { authenticationPanelContingencyOutput } from "@validation/Usuario/authenticationPanelContingency"

export default interface IUsuarioService {
  authenticationPanel(
    params: authenticationPanelOutput
  ): Promise<defaultResponse>
  authenticationPanelContingency(
    params: authenticationPanelContingencyOutput
  ): Promise<defaultResponse>
}
