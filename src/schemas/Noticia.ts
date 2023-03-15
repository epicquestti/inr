import { schema, types } from "papr"
import { papr } from "../lib/backend"

const NoticiaSchema = schema({
  titulo: types.string({ required: true }),
  tituloSecundario: types.string({ required: false }),
  fonte: types.string({ required: true }),
  dataPublicacaoFonte: types.date || types.null({ required: false }),
  imagemDestaque: types.string({ required: true }),
  conteudoTexto: types.string({ required: true }),
  conteudoHtml: types.string({ required: true }),
  notaRedacao: types.string({ required: true })
})

const noticiaModel = papr.model("Noticia", NoticiaSchema)
export type noticiaDocument = typeof NoticiaSchema[0]
export default noticiaModel
