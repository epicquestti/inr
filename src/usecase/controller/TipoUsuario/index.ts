import FuncaoRepository from "@usecase/repository/FuncaoRepository"
import TipoUsuarioFuncoesRepository from "@usecase/repository/TipoUsuarioFuncoesRepository"
import TipoUsuarioRepository from "@usecase/repository/TipoUsuarioRepository"
import TipoUsuarioService from "@usecase/service/TipoUsuario/TipoUsuarioService"
import TipoUsuarioController from "./TipoUsuarioController"

const funcaoRepository = new FuncaoRepository()
const tipoUsuarioFuncoesRepository = new TipoUsuarioFuncoesRepository()
const tipoUsuarioRepository = new TipoUsuarioRepository()
const tipoUsuarioService = new TipoUsuarioService(
  tipoUsuarioRepository,
  tipoUsuarioFuncoesRepository,
  funcaoRepository
)
const tipoUsuarioController = new TipoUsuarioController(tipoUsuarioService)

export default tipoUsuarioController
