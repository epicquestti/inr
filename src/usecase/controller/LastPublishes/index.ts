import LastPublishesRepository from "@usecase/repository/LastPublishesRepository"
import PublicacaoContentsRepository from "@usecase/repository/PublicacaoContentsRepository"
import PublicacaoRepository from "@usecase/repository/PublicacaoRepository"
import UpdatesRepository from "@usecase/repository/UpdatesRepository"
import LastPublishesService from "@usecase/service/LastPublishes/LastPublishesService"
import LastPublishesController from "./LastPublishesController"

const updatesRepository = new UpdatesRepository()
const publicacaoContentsRepository = new PublicacaoContentsRepository()
const publicacaoRepository = new PublicacaoRepository()
const lastPublishesRepository = new LastPublishesRepository()
const lastPublishesService = new LastPublishesService(
  lastPublishesRepository,
  publicacaoRepository,
  publicacaoContentsRepository,
  updatesRepository
)
const lastPublishesController = new LastPublishesController(
  lastPublishesService
)
export default lastPublishesController
