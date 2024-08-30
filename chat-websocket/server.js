// const WebSocket = require('ws')
// const https = require('https')
// const fs = require('fs')

// // Load your SSL/TLS certificate and key
// const server = https.createServer({
//     cert: fs.readFileSync('/etc/letsencrypt/live/theculdesac.club/cert.pem'),
//     key: fs.readFileSync('/etc/letsencrypt/live/theculdesac.club/privkey.pem')
// })

// const wss = new WebSocket.Server({ server })

// wss.on('connection', (ws) => {
//     console.log("client connected")

//     ws.on('message', (message) => {
//         const data = JSON.parse(message)
//         switch (data.type) {
//             case 'chat' :
//                 wss.clients.forEach((client) => {
//                     if (client.readyState === WebSocket.OPEN) {
//                         client.send(JSON.stringify({
//                             data: data.message
//                         }))
//                     }
//                 })
//                 break
            
//             case 'position' :
//                 wss.clients.forEach((client) => {
//                     if (client.readyState === WebSocket.OPEN) {
//                         client.send(JSON.stringify({
//                             data: data.position
//                         }))
//                     }
//                 })
//                 break

//             case 'board' :
//                 wss.clients.forEach((client) => {
//                     if (client.readyState === WebSocket.OPEN) {
//                         client.send(JSON.stringify({
//                             data: {
//                                 board: data.boardState,
//                                 teams: data.teams
//                             }
//                         }))
//                     }
//                 })
//                 break
//         }
//     })

//     ws.on('close', () => {
//         console.log('client disconnected')
//     })
// })

// server.listen(8080, () => {
//     console.log('WebSocket server listening on port 8080')
// })