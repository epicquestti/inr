import { NextApiRequest, NextApiResponse } from "next"

export type handlerProps = {
  get?: (
    req: NextApiRequest,
    res: NextApiResponse,
    user?: { _id: string; tipo: { _id: string; tipo: string } }
  ) => Promise<void>
  post?: (
    req: NextApiRequest,
    res: NextApiResponse,
    user?: { _id: string; tipo: { _id: string; tipo: string } }
  ) => Promise<void>
  put?: (
    req: NextApiRequest,
    res: NextApiResponse,
    user?: { _id: string; tipo: { _id: string; tipo: string } }
  ) => Promise<void>
  delete?: (
    req: NextApiRequest,
    res: NextApiResponse,
    user?: { _id: string; tipo: { _id: string; tipo: string } }
  ) => Promise<void>
}
