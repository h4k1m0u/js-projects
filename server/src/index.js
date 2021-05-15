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

/* Incoming connection from a client */
socketServer.on('connect', (socket) => {
  console.log(`Connection from client ${socket.id}`);

  // global variables
  let state = null;
  let snake0 = null;
  let snake1 = null;
  let apple = null;
  let gameloop = null;

  // fired upon client disconnection
  socket.on('disconnect', (reason) => {
    console.log(`Client ${socket.id} was disconnected. Reason: ${reason}`);
  });

  /* player1 joined the game */
  socket.on('newGame', () => {
    // hide menu for player1 (who just joined)
    socket.emit('hideMenu');

    // update menu buttons (freeze/unfreeze) for both players
    const namespace = socketServer.sockets;
    namespace.emit('updateMenuButtons');
  });

  /* player2 joined the game */
  socket.on('joinGame', () => {
    // reset state with a deep copy (json needed bcos of nested objects)
    state = JSON.parse(JSON.stringify(stateInitial));
    snake0 = new Snake(state.snakes[0]);
    snake1 = new Snake(state.snakes[1]);
    apple = new Apple(state.apple);

    // hide menu for player2 (who just joined)
    socket.emit('hideMenu');

    // start game loop (render canvas) on clients
    const namespace = socketServer.sockets;
    namespace.emit('start');

    // game loop
    gameloop = setInterval(() => {
      // pause or end game loop
      if (state.game.isPaused) {
        return;
      }
      if (state.game.isOver) {
        clearInterval(gameloop);
      }

      // notify two players about state (snake, apple, game) at beginning of frame
      namespace.emit('stateChange', state);

      // move snake & position apple
      snake0.move();
      snake1.move();
      apple.move(snake0);

      // check for collision between snake & apple
      if (snake0.intersects(apple)) {
        state.game.score += 1;
        apple.needsSpawn = true;
      }

      // send updated state (position/speed) for snake & apple to client
      [state.snakes[0].coords, state.snakes[1].coords] = [snake0.coords, snake1.coords];
      [state.snakes[0].speed, state.snakes[1].speed] = [snake0.speed, snake1.speed];
      state.apple.coord = apple.coord;
      state.game.isOver = snake0.isDead;
    }, 1000 / fps);
  });

  /* Move player1 with arrow keys when keypress events received from client */
  socket.on('keyPress', (keyCode) => {
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
    console.log('snake0 ', snake0);
  });
});
