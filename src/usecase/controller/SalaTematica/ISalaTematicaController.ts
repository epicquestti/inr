import { defaultResponse } from "@lib/types/defaultResponse"
import { salaTematicaIdInput } from "@validation/SalaTematica/salaTematicaId"
import { salaTematicaSaveInput } from "@validation/SalaTematica/salaTematicaSave"

export default interface ISalaTematicaController {
  salaTematicaSave(params: salaTematicaSaveInput): Promise<defaultResponse>
  salaTematicaDelete(): Promise<defaultResponse>
  salaTematicaGetById(id: salaTematicaIdInput): Promise<defaultResponse>
  salaTematicaGetByNome(): Promise<defaultResponse>
}
