import ApiRepository from "@usecase/repository/ApiRepository"
import FuncaoApiRepository from "@usecase/repository/FuncaoApiRepository"
import FuncaoRepository from "@usecase/repository/FuncaoRepository"
import TipoUsuarioRepository from "@usecase/repository/TipoUsuarioRepository"
import FuncaoService from "@usecase/service/Funcao/FuncaoService"
import FuncaoController from "./FuncaoController"

const tipoUsuarioRepository = new TipoUsuarioRepository()
const apiRepository = new ApiRepository()
const funcaoApiRepository = new FuncaoApiRepository()
const funcaoRepository = new FuncaoRepository()
const funcaoService = new FuncaoService(
  funcaoRepository,
  funcaoApiRepository,
  apiRepository,
  tipoUsuarioRepository
)
const funcaoController = new FuncaoController(funcaoService)

export default funcaoController
