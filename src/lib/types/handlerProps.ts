import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export type handlerProps = {
  get?: (
    req: NextApiRequest,
    res: NextApiResponse,
    user?: {
      _id: ObjectId
      nome: string
      tipo: { _id: ObjectId; tipo: string }
    }
  ) => Promise<void>
  post?: (
    req: NextApiRequest,
    res: NextApiResponse,
    user?: {
      _id: ObjectId
      nome: string
      tipo: { _id: ObjectId; tipo: string }
    }
  ) => Promise<void>
  put?: (
    req: NextApiRequest,
    res: NextApiResponse,
    user?: {
      _id: ObjectId
      nome: string
      tipo: { _id: ObjectId; tipo: string }
    }
  ) => Promise<void>
  delete?: (
    req: NextApiRequest,
    res: NextApiResponse,
    user?: {
      _id: ObjectId
      nome: string
      tipo: { _id: ObjectId; tipo: string }
    }
  ) => Promise<void>
}
