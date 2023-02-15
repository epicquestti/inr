import { defaultResponse } from "@lib/types/defaultResponse"
import SalaTematicaRepository from "@usecase/repository/SalaTematicaRepository"
import ISalaTematicaService from "./ISalaTematicaService"

export default class SalaTematicaService implements ISalaTematicaService {
  constructor(private _salaTematicaRepository: SalaTematicaRepository) {}

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
