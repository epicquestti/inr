import FuncaoRepository from "@usecase/repository/FuncaoRepository"
import FuncaoService from "@usecase/service/Funcao/FuncaoService"
import FuncaoController from "./FuncaoController"

const funcaoRepository = new FuncaoRepository()
const funcaoService = new FuncaoService(funcaoRepository)
const funcaoController = new FuncaoController(funcaoService)

export default funcaoController
