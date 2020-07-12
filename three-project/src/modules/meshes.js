import * as THREE from 'three';

// import texture images
const pathImage1 = '../assets/images/arid2_ft.jpg';
const pathImage2 = '../assets/images/arid2_bk.jpg';
const pathImage3 = '../assets/images/arid2_up.jpg';
const pathImage4 = '../assets/images/arid2_dn.jpg';
const pathImage5 = '../assets/images/arid2_rt.jpg';
const pathImage6 = '../assets/images/arid2_lf.jpg';

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

export default skybox;
