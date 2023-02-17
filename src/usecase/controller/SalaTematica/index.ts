import SalaSubSalaTematicaRepository from "@usecase/repository/salaSubSalaTematicaRepository"
import SalaTematicaRepository from "@usecase/repository/SalaTematicaRepository"
import SalaTematicaService from "@usecase/service/SalaTematica/SalaTematicaService"
import SalaTematicaController from "./SalaTematicaController"

const salaSubSalaRepository = new SalaSubSalaTematicaRepository()
const salaTematicaRepository = new SalaTematicaRepository()
const salaTematicaService = new SalaTematicaService(
  salaTematicaRepository,
  salaSubSalaRepository
)
const salaTematicaController = new SalaTematicaController(salaTematicaService)

export default salaTematicaController
