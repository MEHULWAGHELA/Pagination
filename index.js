require('dotenv').config();
require('./config/db');
const express = require('express');
const { userController } = require('./controller/userController');
const PORT = process.env.PORT
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('User connected', socket.id)
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
    })

    socket.on('message', (body) => {
        console.log(body)
        socket.emit('message', { 'meassage': "hello" })
    })

    userController(socket)
})
app.use(express.json())

http.listen(PORT, (() => {
    console.log("Listen On Port " + PORT)
})) 