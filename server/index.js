const WebSocket = require('ws')
const express = require('express')
const { request } = require('http')

const app = express()

const server = app.listen(9876, () => {
    console.log('arrancó por el 9876...')
})

const wSServer = new WebSocket.Server({
    noServer: true
})

wSServer.on('connection', ws => {
    ws.on('message', msj => {
        wSServer.clients.forEach(client => {
            if(client){
                if(client.readyState == WebSocket.OPEN){
                    client.send(msj+"")
                }
            }
        })
    })
})

server.on('upgrade', async (request, socket, upgradeHead) => {
    wSServer.handleUpgrade( request, socket, upgradeHead, ws => {
        wSServer.emit('connection', ws, request)
    })
})



