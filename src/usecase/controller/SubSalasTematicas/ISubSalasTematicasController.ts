import { defaultResponse } from "@lib/types/defaultResponse"
import { subSalaTematicaIdInput } from "@validation/SubSalaTematica/subSalaTematicaId"
import { subSalaTematicaSaveInput } from "@validation/SubSalaTematica/subSalaTematicaSave"

export default interface ISubSalasTematicasController {
  subSalaTematicaSave(
    params: subSalaTematicaSaveInput
  ): Promise<defaultResponse>
  subSalaTematicaGetById(id: subSalaTematicaIdInput): Promise<defaultResponse>
  subSalaTematicaDelete(id: subSalaTematicaIdInput): Promise<defaultResponse>
}
