const http = require('http');
const { Server } = require('socket.io');

// bind socketio server to http server (allow socketio.client address)
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8080',
  }
});

// listen for incoming connections from clients
io.on('connect', (socket) => {
  console.log('Server: connection!');
});

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
