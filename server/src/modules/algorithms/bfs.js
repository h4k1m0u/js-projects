#!/usr/bin/env node
// modified bfs to find shortest path
// https://www.geeksforgeeks.org/shortest-path-unweighted-graph/

/*
 * Create object having `array` elements as keys & initialized with given `value`
 * Map can have keys that are not strings (unlike objects who convert them to)
 */
const arrToMap = (arr, value) => {
  const map = arr.reduce((acc, current) => {
    acc[current] = value;
    return acc;
  }, new Map());

  return map;
};

// graph to traverse (pair consist of key=node, value=children nodes)
const graph = new Map([
  [0, [1, 3]],
  [1, [2]],
  [2, []],
  [3, [4, 7]],
  [4, [5, 6, 7]],
  [5, [6]],
  [6, [7]],
  [7, []],
]);
const dest = 6;
const nodes = Array.from(graph.keys());
const visited = arrToMap(nodes, false);
const distances = arrToMap(nodes, 0);
const ancestors = arrToMap(nodes, null);

// push root node into lifo & mark as visited
const fifo = [];
let node = nodes[0];
console.log('node ', node);
fifo.push(node);
visited[nodes] = true;

// push into end & shift from start of array = queue (fifo)
while (fifo.length !== 0) {
  node = fifo.shift();
  console.log('node ', node);

  // break if path found
  if (node === dest) {
    break;
  }

  // only push neighbor not visited yet
  for (let iChild = 0; iChild < graph.get(node).length; iChild += 1) {
    const child = graph.get(node)[iChild];
    if (!visited[child]) {
      fifo.push(child);
      visited[child] = true;

      // increment distance & set ancestor of child node
      distances[child] = distances[node] + 1;
      ancestors[child] = node;
    }
  }
}

// find shortest path by retro-traversal from destination back to root
let node2 = dest;
const path = [];
while (node2 !== null) {
  path.unshift(node2);
  node2 = ancestors[node2];
}

console.log('distances ', distances);
console.log('ancestors ', ancestors);
console.log('path ', path);
