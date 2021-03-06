#!/usr/bin/env node
const http = require('http');
const { Server } = require('socket.io');

const stateInitial = require('./state');
const { keys, fps, canvas } = require('./constants');
const Snake = require('./characters/snake');
const Apple = require('./characters/apple');

const { calculateAdjacencyMatrix, getCellFromXY } = require('./algorithms/tilemap');
const { bfs, getShortestPath } = require('./algorithms/bfs');

// generate adjacency matrix for tilemap
const adjacencyMatrix = calculateAdjacencyMatrix(canvas.nCellsRow, canvas.nCellsCol);

// bind socketio server to http server (allow socketio.client address)
const httpServer = http.createServer();
const socketServer = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:8080',
      'https://h4k1m0u.github.io',
    ],
  },
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// global variables (accessible to all callbacks below)
let state = null;
let snakePC = null;
let snakeNPC = null;
let apple = null;
let gameloop = null;
let isSnakeNPCMoving = false;

/* Incoming connection from a client */
socketServer.on('connect', (socket) => {
  console.log(`Connection from client ${socket.id}`);

  // reset state with a deep copy (json needed bcos of nested objects)
  state = JSON.parse(JSON.stringify(stateInitial));
  snakePC = new Snake(state.snakePC, false);
  snakeNPC = new Snake(state.snakeNPC, true);
  apple = new Apple();

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
  let shortestPath = [];
  socket.on('joinGame', () => {
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

      // move PC snake (after keypress)
      snakePC.move();
      apple.move([snakePC, snakeNPC]);

      // check for snakes & apple collision (in next frame: respawn + bfs)
      if (snakePC.intersects(apple)) {
        state.game.score += 1;
        apple.needsSpawn = true;
        shortestPath = [];
      } else if (snakeNPC.intersects(apple)) {
        apple.needsSpawn = true;
      }

      // after apple eaten, don't recalculate path till next frame
      if (!apple.needsSpawn) {
        // move NPC snake on BFS shortest path towards apple
        const cellApple = getCellFromXY(apple.coord.x, apple.coord.y);
        const cellSnakeNPC = getCellFromXY(snakeNPC.head.x, snakeNPC.head.y);

        if (shortestPath.length === 0) {
          const ancestors = bfs(cellSnakeNPC, cellApple, adjacencyMatrix);
          shortestPath = getShortestPath(cellSnakeNPC, cellApple, ancestors);
        } else if (!isSnakeNPCMoving) {
          // delay NPC snake movement to slow it down
          isSnakeNPCMoving = true;
          setTimeout(() => {
            snakeNPC.move(shortestPath.shift());
            isSnakeNPCMoving = false;
          }, (1.1 * 1000) / fps);
        }
      }

      // send updated state (snakes & apple positions) to client
      state.snakePC.coords = snakePC.coords;
      state.snakeNPC.coords = snakeNPC.coords;
      state.apple.coord = apple.coord;
      state.game.isOver = snakePC.isDead;

      // notify two players about state (snake, apple, game) at beginning of frame
      namespace.emit('stateChange', state);
    }, 1000 / fps);
  });

  /* Move player1 with arrow keys when keypress events received from client */
  socket.on('keyPress', (keyCode) => {
    switch (keyCode) {
      case keys.LEFT:
        if (snakePC.speed.x !== 1) {
          [snakePC.speed.x, snakePC.speed.y] = [-1, 0];
        }
        break;
      case keys.RIGHT:
        if (snakePC.speed.x !== -1) {
          [snakePC.speed.x, snakePC.speed.y] = [1, 0];
        }
        break;
      case keys.UP:
        if (snakePC.speed.y !== 1) {
          [snakePC.speed.x, snakePC.speed.y] = [0, -1];
        }
        break;
      case keys.DOWN:
        if (snakePC.speed.y !== -1) {
          [snakePC.speed.x, snakePC.speed.y] = [0, 1];
        }
        break;
      case keys.ENTER:
        state.game.isPaused = !state.game.isPaused;
        break;
      default:
        break;
    }
  });
});
