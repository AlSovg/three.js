import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './main.scss';

const scene = new THREE.Scene();
const renderElement = document.querySelector(".canvas");

let sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height);
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
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);



const tick = () =>{
  
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()


window.addEventListener("resize", () => {
  sizes.width = document.body.offsetWidth;
  sizes.height = document.body.offsetHeight;

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width , sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera)
})

window.addEventListener("dblclick", () => {
  document.fullscreenElement !== null  ? document.exitFullscreen() : renderElement.requestFullscreen()
})