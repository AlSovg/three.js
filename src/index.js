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

// const geometry = new THREE.CircleGeometry( 1, 20, 0, Math.PI)
// const  geometry = new THREE.PlaneGeometry(1, 1, 10, 10)
// const geometry = new THREE.ConeGeometry(1, 2, 32, 1, true, 0 ,Math.PI)
// const geometry = new THREE.CylinderGeometry(1, 2, 2, 32, 4, true, 0,Math.PI / 4)
// const  geometry = new THREE.RingGeometry(1, 2, 10, 10, 0, Math.PI);
// const geometry = new THREE.TorusGeometry(1, 0.5, 16, 100)
// const geometry = new THREE.TorusKnotGeometry(1, 0.25, 100, 16, 1)
// const  geometry = new THREE.DodecahedronGeometry(1, 0)
// const geometry = new THREE.OctahedronGeometry(1, 0)
// const geometry = new THREE.TetrahedronGeometry(1, 0)
// const geometry = new THREE.IcosahedronGeometry()
// const geometry = new THREE.SphereGeometry(2, 20, 16, 0, Math.PI/2);

const geometry = new THREE.BufferGeometry()

const amount = 50;
const points = new Float32Array(amount * 3 * 3)
for (let i = 0; i < amount * 3 * 3; i++) {
  points[i] = Math.random() * 3;
}

const pointsBuffer = new THREE.BufferAttribute(points, 3)
geometry.setAttribute('position', pointsBuffer)

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