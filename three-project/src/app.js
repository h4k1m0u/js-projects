// source: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

/*
* GUI panel
* https://davidwalsh.name/dat-gui
*/
// add parameters fields to panel
const gui = new dat.GUI();
const params = {
  x: 0,
  y: 0,
  z: 0,
  visible: true,
  color: 0x00aaff,
};
gui.add(params, 'x', -100, 100, 0.1);
gui.add(params, 'y', -100, 100, 0.1);
gui.add(params, 'z', -100, 100, 0.1);
gui.add(params, 'visible');
gui.addColor(params, 'color');

/*
* Scene
*/
// setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
  0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// scene navigation with pan/zoom/rotate
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
controls.update();

// lightbulb
const light = new THREE.PointLight();
light.position.set(-5, 5, 0);
scene.add(light);

/*
* Objects
*/
// add axes & grid to scene
scene.add(new THREE.AxesHelper(5));
scene.add(new THREE.GridHelper(20, 20));

// add cube to scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x00aaff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// add points to scene
const geometryPoints = new THREE.Geometry();
const coords = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]];
geometryPoints.vertices = coords.map((coord) => new THREE.Vector3(coord[0], coord[1], coord[2]));
const materialPoints = new THREE.PointsMaterial({ size: 0.2, color: 0xffffff });
const meshPoints = new THREE.Points(geometryPoints, materialPoints);
scene.add(meshPoints);

/*
* Loop
*/
// animation loop
const start = Date.now();

function animate() {
  // update box according to panels values
  cube.visible = params.visible;
  cube.position.set(params.x, params.y, params.z);
  cube.material.color.set(params.color);

  // update orbit controls in each frame
  controls.update();

  // rotate cube in each frame (for 10s)
  if (Date.now() - start < 10000) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  renderer.render(scene, camera);

  // called before next screen repaint
  window.requestAnimationFrame(animate);
}

animate();
