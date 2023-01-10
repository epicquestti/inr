import PublicacaoContentsRepository from "@usecase/repository/PublicacaoContentsRepository"
import PublicacaoRepository from "@usecase/repository/PublicacaoRepository"
import PublicacaoService from "@usecase/service/Publicacoes/PublicacaoService"
import PublicacoesController from "./PublicacoesController"

const publicacaoContentsRepository = new PublicacaoContentsRepository()
const publicacaoRepository = new PublicacaoRepository()

const publicacaoService = new PublicacaoService(
  publicacaoRepository,
  publicacaoContentsRepository
)

const publicacoesController = new PublicacoesController(publicacaoService)

export default publicacoesController
