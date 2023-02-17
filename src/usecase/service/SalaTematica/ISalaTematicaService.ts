import { defaultResponse } from "@lib/types/defaultResponse"
import { salaTematicaIdOutput } from "@validation/SalaTematica/salaTematicaId"
import { salaTematicaSaveOutput } from "@validation/SalaTematica/salaTematicaSave"

export default interface ISalaTematicaService {
  salaTematicaSave(params: salaTematicaSaveOutput): Promise<defaultResponse>
  salaTematicaDelete(): Promise<defaultResponse>
  salaTematicaGetById(id: salaTematicaIdOutput): Promise<defaultResponse>
  salaTematicaGetByNome(): Promise<defaultResponse>
}
