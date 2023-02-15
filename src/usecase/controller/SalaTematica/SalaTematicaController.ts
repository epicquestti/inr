import { defaultResponse } from "@lib/types/defaultResponse"
import SalaTematicaService from "@usecase/service/SalaTematica/SalaTematicaService"
import ISalaTematicaController from "./ISalaTematicaController"

export default class SalaTematicaController implements ISalaTematicaController {
  constructor(private _salaTematicaService: SalaTematicaService) {}

  salaTematicaCreate(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  salaTematicaUpdate(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  salaTematicaDelete(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  salaTematicaGetById(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
  salaTematicaGetByNome(): Promise<defaultResponse> {
    throw new Error("Method not implemented.")
  }
}
