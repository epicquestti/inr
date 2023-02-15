import SubSalasTematicasRepository from "@usecase/repository/SubSalasTematicasRepository"
import SubSalasTematicasService from "@usecase/service/SubSalasTematicas/SubSalasTematicasService"
import SubSalasTematicasController from "./SubSalasTematicasController"

const subSalasTematicasRepository = new SubSalasTematicasRepository()
const subSalasTematicasService = new SubSalasTematicasService(
  subSalasTematicasRepository
)
const subSalasTematicasController = new SubSalasTematicasController(
  subSalasTematicasService
)

export default subSalasTematicasController
