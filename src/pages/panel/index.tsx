import { ViewPanel } from "@Components/Panel"
import { useEffect } from "react"
import { io } from "socket.io-client"
let socket
export default function Home() {
  async function initialize() {
    socket = io()
  }
  useEffect(() => {
    initialize()
  })
  return <ViewPanel />
}
