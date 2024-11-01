import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './main.scss';

const scene = new THREE.Scene();
const renderElement = document.querySelector(".canvas");

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const controls = new OrbitControls(camera, renderElement)
controls.enableDamping = true

scene.add(camera)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color : 'yellow',
  wireframe : true,
})

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)


const renderer = new THREE.WebGLRenderer({ canvas: renderElement });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// const cursor = {
//   x : 0, 
//   y : 0
// }

// window.addEventListener('mousemove', (event)=>{
//   cursor.x = -(event.clientX / window.innerWidth - 0.5)
//   cursor.y = event.clientY / window.innerHeight - 0.5
// })


const tick = () =>{
  
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()