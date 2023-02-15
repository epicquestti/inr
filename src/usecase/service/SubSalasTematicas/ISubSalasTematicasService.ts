import { defaultResponse } from "@lib/types/defaultResponse"
import { subSalaTematicaIdOutput } from "@validation/SubSalaTematica/subSalaTematicaId"
import { subSalaTematicaSaveOutput } from "@validation/SubSalaTematica/subSalaTematicaSave"

export default interface ISubSalasTematicasService {
  subSalaTematicaSave(
    params: subSalaTematicaSaveOutput
  ): Promise<defaultResponse>
  subSalaTematicaGetById(
    params: subSalaTematicaIdOutput
  ): Promise<defaultResponse>
  subSalaTematicaDelete(id: subSalaTematicaIdOutput): Promise<defaultResponse>
}
