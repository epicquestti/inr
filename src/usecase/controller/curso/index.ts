import CursoRepository from "@usecase/repository/CursoRepository"
import CursoService from "@usecase/service/Curso/CursoService"
import CursoController from "./CursoController"

const cursoRepository = new CursoRepository()
const cursoService = new CursoService(cursoRepository)
const cursoController = new CursoController(cursoService)

export default cursoController
