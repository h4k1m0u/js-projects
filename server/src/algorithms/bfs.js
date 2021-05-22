#!/usr/bin/env node
/*
 * Create map and set its keys to the same value
 * Map can have keys that are not strings (unlike objects who convert them to strings)
 *
 * @param arr    Map keys
 * @param value  Value to initialize all map elements
 * @return map   Map
 */
const initMap = (arr, value) => {
  const map = arr.reduce((acc, current) => {
    acc[current] = value;
    return acc;
  }, new Map());

  return map;
};

/**
 * Breadth First Search algorithm to find shortest path
 *
 * @param  nodeSrc          Source node
 * @param  nodeDest         Destination node
 * @param  adjacencyMatrix  Adjacency matrix between nodes (see tilemap.js)
 * @return ancestors        Map with key: node, value: its director ancestor
 */
const bfs = (nodeSrc, nodeDest, adjacencyMatrix) => {
  const nodes = Array.from(adjacencyMatrix.keys());
  const visited = initMap(nodes, false);
  const distances = initMap(nodes, 0);
  const ancestors = initMap(nodes, null);

  // push root node into fifo & mark as visited
  const fifo = [];
  // let node = nodes[0];
  let node = nodeSrc;
  fifo.push(node);
  visited[node] = true;

  // push into end & shift (pop) from start of array => fifo (queue)
  while (fifo.length !== 0) {
    node = fifo.shift();

    // break if path found
    if (node === nodeDest) {
      break;
    }

    // only push neighbor not visited yet
    const children = adjacencyMatrix.get(node);
    for (let iChild = 0; iChild < children.length; iChild += 1) {
      const child = children[iChild];
      if (!visited[child]) {
        fifo.push(child);
        visited[child] = true;

        // increment distance & set ancestor of child node
        distances[child] = distances[node] + 1;
        ancestors[child] = node;
      }
    }
  }

  return ancestors;
};

/**
 * Find shortest path by retro-traversal from destination back to source node
 * Ancestors were pre-calculated by bfs()
 *
 * @param  nodeSrc    Source node where to stop retro-traversal
 * @param  nodeDest   Destination node from which to retro-traverse ancestors array
 * @param  ancestors  Map with key: node, value: its direct ancestor node
 * @return path       Path array from source node (excl.) to destination node (incl.)
 */
const getShortestPath = (nodeSrc, nodeDest, ancestors) => {
  let node = nodeDest;
  const path = [];

  while (node !== nodeSrc) {
    path.unshift(node);
    node = ancestors[node];
  }

  return path;
};

module.exports = {
  bfs,
  getShortestPath,
};
