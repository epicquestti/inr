import SalaTematicaRepository from "@usecase/repository/SalaTematicaRepository"
import SalaTematicaService from "@usecase/service/SalaTematica/SalaTematicaService"
import SalaTematicaController from "./SalaTematicaController"

const salaTematicaRepository = new SalaTematicaRepository()
const salaTematicaService = new SalaTematicaService(salaTematicaRepository)
const salaTematicaController = new SalaTematicaController(salaTematicaService)

export default salaTematicaController
