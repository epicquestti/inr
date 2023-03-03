import { noticiaDocument } from "@schema/Noticia"
import { salaTematicaDocument } from "@schema/SalaTematica"
import { subSalasTematicasDocument } from "@schema/SubSalasTematicas"

export type arrayMultipleSchemas =
  | noticiaDocument
  | salaTematicaDocument
  | subSalasTematicasDocument

export type returnArray = arrayMultipleSchemas & { checked: boolean }
