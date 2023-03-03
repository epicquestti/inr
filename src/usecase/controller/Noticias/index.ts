import NoticiaRepository from "@usecase/repository/NoticiaRepository"
import NoticiasService from "@usecase/service/Noticias/NoticiasService"
import NoticiasController from "./NoticiasController"

const noticiasRepository = new NoticiaRepository()
const noticiasService = new NoticiasService(noticiasRepository)
const noticiasController = new NoticiasController(noticiasService)

export default noticiasController
