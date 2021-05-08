const http = require('http');
const { Server } = require('socket.io');

const stateInitial = require('./state');
const { keys, fps } = require('./constants');

// bind socketio server to http server (allow socketio.client address)
const httpServer = http.createServer();
const socketServer = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8080',
  },
});

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// incoming connection from a client
socketServer.on('connect', (socket) => {
  console.log('Server: connection');

  // initialize state with a deep copy (json needed bcos of nested objects)
  const state = JSON.parse(JSON.stringify(stateInitial));

  // receive keycode from client
  socket.on('keyPress', (keyCode) => {
    switch (keyCode) {
      case keys.LEFT:
        [state.snake.speed.x, state.snake.speed.y] = [-1, 0];
        break;
      case keys.RIGHT:
        [state.snake.speed.x, state.snake.speed.y] = [1, 0];
        break;
      case keys.UP:
        [state.snake.speed.x, state.snake.speed.y] = [0, -1];
        break;
      case keys.DOWN:
        [state.snake.speed.x, state.snake.speed.y] = [0, 1];
        break;
      default:
        break;
    }
  });

  // notify client about new state (snake speed) every frame
  setInterval(() => {
    socket.emit('stateChange', state);
  }, 1000 / fps);
});
