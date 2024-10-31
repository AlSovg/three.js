import * as THREE from 'three'
import './main.scss';

const scene = new THREE.Scene();

const quaternion = new THREE.Quaternion();

const AxesHelper = new THREE.AxesHelper(5)

scene.add(AxesHelper)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true });

const group = new THREE.Group();
group.scale.z = 2
group.rotation.y = Math.PI / 4;

const cube1 = new THREE.Mesh(geometry, material);
cube1.position.set(-2, 0, 0);

const cube2 = new THREE.Mesh(geometry, material);
cube2.position.set(0, 0, 0);

const cube3 = new THREE.Mesh(geometry, material);
cube3.position.set(2, 0, 0);

group.add(cube1)
group.add(cube2)
group.add(cube3)



scene.add(group)
//
// cube.position.x = -3
// cube.position.y = -3
// cube.position.z = 1
//
// cube.scale.set(1,2,0.5)
//
// cube.rotation.x = Math.PI / 4
// cube.rotation.y = Math.PI / 4
//
// cube.rotation.reorder('YXZ')

// scene.add(cube);

const size = {
  width: 600,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75,size.width / size.height, 0.1, 1000 );
camera.position.set(0, 1, 10);

scene.add(camera)

const renderElement = document.querySelector(".canvas");

const renderer = new THREE.WebGLRenderer({ canvas: renderElement });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
