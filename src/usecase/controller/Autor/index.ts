import AutorRepository from "@usecase/repository/AutorRepository"
import AutorService from "@usecase/service/Autor/AutorService"
import AutorController from "./AutorController"

const autorRepository = new AutorRepository()
const autorService = new AutorService(autorRepository)
const autorController = new AutorController(autorService)

export default autorController
