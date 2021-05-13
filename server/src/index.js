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

// initialize state with a deep copy (json needed bcos of nested objects)
const state = JSON.parse(JSON.stringify(stateInitial));
const snake0 = new Snake(state.snakes[0]);
const snake1 = new Snake(state.snakes[1]);
const apple = new Apple(state.apple);

/* Move snake0 with arrow keys */
const onKeyPress = (keyCode) => {
  switch (keyCode) {
    case keys.LEFT:
      if (snake0.speed.x !== 1) {
        [snake0.speed.x, snake0.speed.y] = [-1, 0];
      }
      break;
    case keys.RIGHT:
      if (snake0.speed.x !== -1) {
        [snake0.speed.x, snake0.speed.y] = [1, 0];
      }
      break;
    case keys.UP:
      if (snake0.speed.y !== 1) {
        [snake0.speed.x, snake0.speed.y] = [0, -1];
      }
      break;
    case keys.DOWN:
      if (snake0.speed.y !== -1) {
        [snake0.speed.x, snake0.speed.y] = [0, 1];
      }
      break;
    case keys.ENTER:
      state.game.isPaused = !state.game.isPaused;
      break;
    default:
      break;
  }
};

/* First player joined the game */
const onNewGame = () => {
};

/* Second player joined the game */
const onJoinGame = () => {
  setInterval(() => {
    // notify two players about state (snake, apple, game) at beginning of frame
    const namespace = socketServer.sockets;
    namespace.emit('stateChange', state);

    // pause or end game
    if (state.game.isOver || state.game.isPaused) {
      return;
    }

    // move snake & position apple
    snake0.move();
    snake1.move();
    apple.move(snake0);

    // check for collision between snake & apple
    if (snake0.intersects(apple)) {
      console.log('collision!');
      state.game.score += 1;
      apple.needsSpawn = true;
    }

    // send updated state (position/speed) for snake & apple to client
    [state.snakes[0].coords, state.snakes[1].coords] = [snake0.coords, snake1.coords];
    [state.snakes[0].speed, state.snakes[1].speed] = [snake0.speed, snake1.speed];
    state.apple.coord = apple.coord;
    state.game.isOver = state.snakes[0].isDead || state.snakes[1].isDead;
  }, 1000 / fps);
};

/* Incoming connection from a client */
socketServer.on('connect', (socket) => {
  console.log(`Connection from client ${socket.id}`);

  // fired upon client disconnection
  socket.on('disconnect', (reason) => {
    console.log(`Client ${socket.id} was disconnected. Reason: ${reason}`);
  });

  // events emitted from client
  socket.on('keyPress', onKeyPress);
  socket.on('newGame', onNewGame);
  socket.on('joinGame', onJoinGame);
});
