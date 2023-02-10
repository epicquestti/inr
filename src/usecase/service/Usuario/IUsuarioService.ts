import { defaultResponse } from "@lib/types/defaultResponse"
import { authenticationPanelOutput } from "@validation/Usuario/authenticationPanel"
import { authenticationPanelContingencyOutput } from "@validation/Usuario/authenticationPanelContingency"
import { usuarioIdOutput } from "@validation/Usuario/usuarioId"
import { usuarioSaveOutput } from "@validation/Usuario/usuarioSave"

export default interface IUsuarioService {
  authenticationPanel(
    params: authenticationPanelOutput
  ): Promise<defaultResponse>
  authenticationPanelContingency(
    params: authenticationPanelContingencyOutput
  ): Promise<defaultResponse>
  usuarioSave(params: usuarioSaveOutput): Promise<defaultResponse>
  usuarioGetById(params: usuarioIdOutput): Promise<defaultResponse>
}
