import { defaultResponse } from "@lib/types/defaultResponse"

export default interface ISalaTematicaController {
  salaTematicaCreate(): Promise<defaultResponse>
  salaTematicaUpdate(): Promise<defaultResponse>
  salaTematicaDelete(): Promise<defaultResponse>
  salaTematicaGetById(): Promise<defaultResponse>
  salaTematicaGetByNome(): Promise<defaultResponse>
}
