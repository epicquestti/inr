import FuncaoRepository from "@usecase/repository/FuncaoRepository"
import TipoUsuarioRepository from "@usecase/repository/TipoUsuarioRepository"
import UsuarioRepository from "@usecase/repository/UsuarioRepository"
import UsuarioService from "@usecase/service/Usuario/UsuarioService"
import UsuarioController from "./UsuarioController"

const funcaoRepository = new FuncaoRepository()
const tipoUsuarioRepository = new TipoUsuarioRepository()
const usuarioRepository = new UsuarioRepository()

const usuarioService = new UsuarioService(
  usuarioRepository,
  tipoUsuarioRepository,
  funcaoRepository
)

const usuarioController = new UsuarioController(usuarioService)

export default usuarioController
