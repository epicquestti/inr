import { salaTematicaDocument } from "@schema/SalaTematica"

export default class SalaTematicaRepository {
  async salaTematicaCreate(): Promise<salaTematicaDocument | null> {
    return null
  }

  async salaTematicaUpdate(): Promise<number> {
    return 0
  }

  async salaTematicaDelete(): Promise<number> {
    return 0
  }

  async salaTematicaGetById(): Promise<salaTematicaDocument | null> {
    return null
  }

  async salaTematicaGetByNome(): Promise<salaTematicaDocument | null> {
    return null
  }
}
