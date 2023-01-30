import TipoUsuarioFuncoesRepository from "@usecase/repository/TipoUsuarioFuncoesRepository"
import TipoUsuarioRepository from "@usecase/repository/TipoUsuarioRepository"
import TipoUsuarioService from "@usecase/service/TipoUsuario/TipoUsuarioService"
import TipoUsuarioController from "./TipoUsuarioController"

const tipoUsuarioFuncoesRepository = new TipoUsuarioFuncoesRepository()
const tipoUsuarioRepository = new TipoUsuarioRepository()
const tipoUsuarioService = new TipoUsuarioService(
  tipoUsuarioRepository,
  tipoUsuarioFuncoesRepository
)
const tipoUsuarioController = new TipoUsuarioController(tipoUsuarioService)

export default tipoUsuarioController
