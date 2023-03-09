import { noticiaDocument } from "@schema/Noticia"
import { noticiaSaveOutput } from "@validation/Noticia/noticiaSave"

export default class NoticiaRepository {
  async noticiaCreate(
    params: noticiaSaveOutput
  ): Promise<noticiaDocument | null> {
    return null
  }

  async noticiaUpdate(
    params: noticiaSaveOutput
  ): Promise<noticiaDocument | null> {
    return null
  }

  async noticiaGetById(
    params: noticiaSaveOutput
  ): Promise<noticiaDocument | null> {
    return null
  }

  async noticiaDelete(
    params: noticiaSaveOutput
  ): Promise<noticiaDocument | null> {
    return null
  }
}
