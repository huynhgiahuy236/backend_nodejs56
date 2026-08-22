import { createServer } from "http"
import { Server } from "socket.io"

export const initSocket = (app) => {
    const httpServer = createServer(app)
    const io = new Server(httpServer, {
    })
    io.on("connection", (socket) => {
        console.log("socket-id", socket.id)
        socket.on("CREATE_ROOM", () => {
            
        })
    })
    return httpServer;
}