import * as THREE from 'three'
import './main.scss';

const scene = new THREE.Scene();

const AxesHelper = new THREE.AxesHelper(5)

scene.add(AxesHelper)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const cube = new THREE.Mesh(geometry, material);

// cube.position.x = -3
// cube.position.y = -3
// cube.position.z = 1

cube.scale.set(1,2,0.5)

scene.add(cube);

const size = {
  width: 600,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(1,1,10)

scene.add(camera)


const renderElement = document.querySelector(".canvas");

const renderer = new THREE.WebGLRenderer({ canvas: renderElement });
renderer.render(scene, camera);
