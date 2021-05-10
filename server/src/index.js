const http = require('http');
const { Server } = require('socket.io');

const stateInitial = require('./modules/state');
const { keys, fps } = require('./modules/constants');
const Snake = require('./modules/characters/snake');
const Apple = require('./modules/characters/apple');

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
  console.log(`Connection from client ${socket.id}`);

  // initialize state with a deep copy (json needed bcos of nested objects)
  const state = JSON.parse(JSON.stringify(stateInitial));
  const snake = new Snake(state.snake);
  const apple = new Apple(state.apple);

  // receive keycode from client
  socket.on('keyPress', (keyCode) => {
    switch (keyCode) {
      case keys.LEFT:
        [snake.speed.x, snake.speed.y] = [-1, 0];
        break;
      case keys.RIGHT:
        [snake.speed.x, snake.speed.y] = [1, 0];
        break;
      case keys.UP:
        [snake.speed.x, snake.speed.y] = [0, -1];
        break;
      case keys.DOWN:
        [snake.speed.x, snake.speed.y] = [0, 1];
        break;
      default:
        break;
    }
  });

  // fired upon client disconnection
  socket.on('disconnect', (reason) => {
    console.log(`Client ${socket.id} was disconnected. Reason: ${reason}`);
  });

  // notify client about new state (snake speed) every frame
  setInterval(() => {
    // move snake & position apple
    snake.move();
    apple.move(snake);

    // check for collision between snake & apple
    if (snake.intersects(apple)) {
      state.score += 1;
      apple.needsSpawn = true;
    }

    // send updated state (position/speed) for snake & apple to client
    [state.snake.coords, state.snake.speed] = [snake.coords, snake.speed];
    state.apple.coord = apple.coord;

    socket.emit('stateChange', state);
  }, 1000 / fps);
});
