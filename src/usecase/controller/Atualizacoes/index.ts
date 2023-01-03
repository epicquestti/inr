import UpdatesRepository from "src/usecase/repository/UpdatesRepository"
import AtualizacoesService from "src/usecase/service/Atualizacoes/AtualizacoesService"
import AtualizacoesController from "./AtualizacoesController"

const udatesRepository = new UpdatesRepository()
const atualizacaoService = new AtualizacoesService(udatesRepository)
const atualizacoesController = new AtualizacoesController(atualizacaoService)

export default atualizacoesController
