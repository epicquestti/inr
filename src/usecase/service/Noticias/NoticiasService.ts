import NoticiaRepository from "@usecase/repository/NoticiaRepository"
import INoticiasService from "./INoticiasService"

export default class NoticiasService implements INoticiasService {
  constructor(private _noticiasRepository: NoticiaRepository) {}
}
