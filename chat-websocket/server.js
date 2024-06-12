const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
    console.log("client connected")

    ws.on('message', (message) => {
        const data = JSON.parse(message)
        switch (data.type) {
            case 'chat' :
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            data: data.message
                        }))
                    }
                })
                break
            
            case 'position' :
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            data: data.position
                        }))
                    }
                })
                break

            case 'board' :
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            data: {
                                board: data.boardState,
                                teams: data.teams
                            }
                        }))
                    }
                })
                break
        }
    })

    ws.on('close', () => {
        console.log('client disconnected')
    })
})

console.log('web socket running on localhost:8080')