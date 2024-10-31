import * as THREE from 'three'
import './main.scss';

const scene = new THREE.Scene();

const AxesHelper = new THREE.AxesHelper(5)

scene.add(AxesHelper)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const size = {
  width: 600,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75,size.width / size.height, 0.1, 1000 );
camera.position.set(0, 0, 3);

scene.add(camera)

const renderElement = document.querySelector(".canvas");

const renderer = new THREE.WebGLRenderer({ canvas: renderElement });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

// let time = Date.now()

const tick = () => {
  // const currentTime = Date.now();
  // const delta = currentTime - time;
  // time = currentTime;
  const elapsedTime = clock.getElapsedTime();

  camera.position.x = Math.cos(elapsedTime)
  camera.position.y = Math.sin(elapsedTime)
  camera.lookAt(cube.position)

  // cube.rotation.y += 0.01 * elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();