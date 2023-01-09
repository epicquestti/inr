import ApiRepository from "@usecase/repository/ApiRepository"
import ApiService from "@usecase/service/Api/ApiService"
import { ApiController } from "./ApiController"

const apiRepository = new ApiRepository()
const apiService = new ApiService(apiRepository)
const apiController = new ApiController(apiService)

export default apiController
