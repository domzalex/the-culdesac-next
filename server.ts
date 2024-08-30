/******************************************************************
Refs:
- https://nextjs.org/docs/pages/building-your-application/configuring/custom-server
- https://github.com/vercel/next.js/tree/canary/examples/custom-server
- https://socket.io/docs/v4/server-api/

*******************************************************************/

import { createServer } from "node:http";
import next from "next";
import { Server } from 'socket.io'

require('dotenv').config()

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket: any) => {
    console.log(`WS: Client connected on socket ${socket.id}`)

	socket.conn.once("upgrade", () => {
		console.log(`WS: Transport for socket ${socket.id} upgraded to ${socket.conn.transport.name}`);
	});

	socket.on("disconnect", (reason: string) => {
		console.log(`WS: Client disconnected from socket ${socket.id} because ${reason}`)
	});
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});