import * as THREE from 'three'
import './main.scss';
import {bool} from "three/tsl";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true });
const group = new THREE.Group();
const meshes = []

const colors = ['yellow', 'green', 'blue', 'red', 'blue'];

for (let x = -1.2; x <= 1.2; x+=1.2) {
  for (let y = -1.2; y <= 1.2; y+=1.2) {
    const material = new THREE.MeshBasicMaterial({ color: colors[((Math.random() * 3) | 0) + 1], wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.scale.set(0.5,0.5, 0.5)
    mesh.position.set(x, y, 0);
    meshes.push(mesh);
  }
}
group.add(...meshes);
scene.add(group);



const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(1, 1, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera)

const renderElement = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({ canvas: renderElement });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const clock = new THREE.Clock();
const maxScale = 1
const minScale = 0.5
let grow = false

const animate = () => {
  const delta = clock.getDelta();
  meshes.forEach((mesh, index) => {
    const mult = index % 2 === 0 ? 1 : -1;
    mesh.rotation.x += mult * delta
    mesh.rotation.y += mult * delta * 0.2
  })

  const elapsedTime = clock.getElapsedTime();
  camera.position.set(Math.sin(elapsedTime), Math.cos(elapsedTime));
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const mult = grow ? 1 : -1;
  group.scale.x += mult * delta * 0.2
  group.scale.y += mult * delta* 0.2
  group.scale.z += mult * delta* 0.2

  if (grow && group.scale.x >= maxScale) {
    grow = false
  }
  else if(!grow && group.scale.x <= minScale){
    grow = true
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);

}
animate()