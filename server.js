const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Ensure you are using the correct import for Server

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let online = {};

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log(__dirname);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
    socket.broadcast.emit('connection');

    socket.on('user-joined', (username) => {
        online[socket.id] = username;
        io.emit('user-list', Object.values(online));
    })

    socket.on('chat message', (msg) => {
        let user = online[socket.id];
        socket.broadcast.emit('chat message', {user: user, msg: msg});
    })

    socket.on('disconnect', (e) => {
        delete online[socket.id];
        io.emit('user-list', Object.values(online));
    })
})