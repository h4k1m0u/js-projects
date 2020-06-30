import * as THREE from 'three';

// import texture images
import pathImage1 from 'images/arid2_ft.jpg';
import pathImage2 from 'images/arid2_bk.jpg';
import pathImage3 from 'images/arid2_up.jpg';
import pathImage4 from 'images/arid2_dn.jpg';
import pathImage5 from 'images/arid2_rt.jpg';
import pathImage6 from 'images/arid2_lf.jpg';

function drawCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x00ffff });
  const cube = new THREE.Mesh(geometry, material);

  return cube;
}

function skybox() {
  // tutorial: https://redstapler.co/create-3d-world-with-three-js-and-skybox-technique/
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    pathImage1,
    pathImage2,
    pathImage3,
    pathImage4,
    pathImage5,
    pathImage6,
  ]);

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, envMap: texture, side: THREE.BackSide,
  });
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
}

function i9iw() {
  const i = 3;
  return i;
}

export {
  skybox,
  i9iw,
  drawCube,
};
