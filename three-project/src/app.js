// source: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/*
* Scene
*/
// setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
  0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// scene navigation with pan/zoom/rotate
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
controls.update();

/*
* Objects
*/
// add axes to scene
const axes = new THREE.AxesHelper(5);
scene.add(axes);

// add cube to scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00aaff });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 3;
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
