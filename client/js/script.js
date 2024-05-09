const URL = 'ws://localhost:9876/'
const wsServer = new WebSocket(URL)


const messages = document.getElementById('messages')
const message = document.getElementById('message')
const send = document.getElementById('send')

send.disabled = true

send.addEventListener('click', sendMessage, false)

function sendMessage() {
    const text = message.value
    console.log('enviando mensaje', text)
    writeMessages(text, "Yo")
    wsServer.send(text)
}

function writeMessages(text, from) {
    const msg = document.createElement('h3')
    msg.innerText = from + "escribo: " + text
    messages.appendChild(msg)
}

wsServer.onopen = function() {
    send.disabled = false
}

wsServer.onmessage = function(evt) {
    writeMessages(evt.data, "Anónimo")
}

