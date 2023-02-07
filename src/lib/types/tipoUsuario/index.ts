import { ObjectId } from "mongodb"

export type funcaoBooleanType = {
  _id: ObjectId
  nome: string
  root: string
  icone: string
  nivel: string
  tipo: string
  checked: boolean
}
