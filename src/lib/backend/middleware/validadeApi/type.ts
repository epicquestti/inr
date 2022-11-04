import { NextApiRequest, NextApiResponse } from "next"

export type handlerProps = {
  get?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
  post?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
  put?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
  delete?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
}
