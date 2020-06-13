// source: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
import * as THREE from 'three';


// setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,
    0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add axes to scene
const axes = new THREE.AxesHelper(5);
scene.add(axes);

// add cube to scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00aaff});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// animation loop
let start = Date.now();

const animate = function() {
    // rotate cube in each frame
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);

    // called before next screen repaint (for 10s)
    if (Date.now() - start < 10000)
        window.requestAnimationFrame(animate);
}

animate();
