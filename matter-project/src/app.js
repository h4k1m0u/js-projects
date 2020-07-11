// https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-4-meet-matter-js-abf4dfa65ca1
import {
  Engine, Render, World, Bodies,
} from 'matter-js';

// create an engine & a renderer
const engine = Engine.create();
const render = Render.create({
  element: document.body,
  engine,
});

// add two boxes and a ground to world
const box1 = Bodies.rectangle(300, 100, 100, 20);
const box2 = Bodies.rectangle(300, 100, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
World.add(engine.world, [box1, box2, ground]);

// run engine and rendrer
Engine.run(engine);
Render.run(render);
