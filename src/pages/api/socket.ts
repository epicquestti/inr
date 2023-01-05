import { NextApiResponseWithSocket } from "@lib/types/NextApiResponseWithSocket"
import { NextApiRequest } from "next"
import { Server } from "socket.io"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
): Promise<void> {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    io.on("connection", async socket => {
      console.log(`client connected with id: ${socket.id}`)

      socket.on("disconnect", () => {
        console.log(`client ${socket.id} disconnected.`)
      })
    })

    res.socket.server.io = io
  }

  res.end()
}
