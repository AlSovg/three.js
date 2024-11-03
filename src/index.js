import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import TWEEN from "three/examples/jsm/libs/tween.module";
import Stats from "stats.js";
import * as dat from "lil-gui"
import './main.scss';

const scene = new THREE.Scene();
const renderElement = document.querySelector(".canvas");

let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 30);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const controls = new OrbitControls(camera, renderElement)
controls.enableDamping = true

const stats = new Stats();
stats.showPanel(0)

const gui = new dat.GUI({ closeFolders : true});

document.body.appendChild(stats.dom);

scene.add(camera)

new THREE.BoxGeometry(1, 1, 1);


const group = new THREE.Group();
const geometries = [
    new THREE.CircleGeometry(1, 20, 0, Math.PI),
    new THREE.PlaneGeometry(1, 1, 10, 10),
    new THREE.ConeGeometry(1, 2, 32, 1, true, 0, Math.PI),
    new THREE.CylinderGeometry(1, 2, 2, 32, 4, true, 0, Math.PI / 4),
    new THREE.RingGeometry(1, 2, 10, 10, 0, Math.PI),
    new THREE.TorusGeometry(1, 0.5, 16, 100),
    new THREE.TorusKnotGeometry(1, 0.25, 100, 16, 1),
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.IcosahedronGeometry(),
    new THREE.SphereGeometry(2, 20, 16, 0, Math.PI / 2),
]
const parameters = {
    color : 'gray'
}
const material = new THREE.MeshBasicMaterial({
    color: parameters.color,
    wireframe: true,
})

let index = 0;
let activeIndex = -1
for (let i = -5; i <= 5; i += 5) {
    for (let j = -5; j <= 5; j += 5) {

        const mesh = new THREE.Mesh(geometries[index], material)
        mesh.position.set(i, j, 10)
        mesh.index = index
        mesh.basePosition = new THREE.Vector3(i, j, 10)
        group.add(mesh)
        index += 1
    }

}

const scaleFolder = gui.addFolder('Scale')
scaleFolder.add(group.scale, 'x').min(0).max(5).step(0.1).name("Расширение по оси х")
scaleFolder.add(group.scale, 'y').min(0).max(5).step(0.1).name("Расширение по оси х")
scaleFolder.add(group.scale, 'z').min(0).max(5).step(0.1).name("Расширение по оси х")

gui.add(group, 'visible')
gui.add(material, 'wireframe')
gui.addColor(parameters, 'color').onChange(() => material.color.set(parameters.color));

scene.add(group)

const renderer = new THREE.WebGLRenderer({canvas: renderElement});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const raycaster = new THREE.Raycaster()
const handleClick = (event) => {
    const pointer = new THREE.Vector2()
    pointer.x = 2 * (event.clientX / document.body.offsetWidth) - 1
    pointer.y = -2 * (event.clientY / document.body.offsetHeight) + 1

    if (activeIndex !== -1) {
        resetActive()
    }

    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(group.children);
    for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set('purple')
        activeIndex = intersects[i].object.index

        new TWEEN.Tween(intersects[i].object.position).to({
            x: 0,
            y: 0,
            z : 25
        }, Math.random() * 1000 + 1000).easing(
            TWEEN.Easing.Exponential.InOut
        ).start()
    }
}

window.addEventListener('click', handleClick);

const resetActive = () => {
    group.children[activeIndex].material.color.set('gray')
    new TWEEN.Tween(group.children[activeIndex].position).to({
        x: group.children[activeIndex].basePosition.x,
        y: group.children[activeIndex].basePosition.y,
        z : group.children[activeIndex].basePosition.z
    }, Math.random() * 1000 + 1000).easing(
        TWEEN.Easing.Exponential.InOut
    ).start()
    activeIndex = -1
}

const clock = new THREE.Clock();
const tick = () => {
    stats.begin()

    const delta = clock.getDelta();
    if (activeIndex !== -1){
        group.children[activeIndex].rotation.y += 0.5 * delta;

    }
    TWEEN.update()
    controls.update()
    renderer.render(scene, camera)

    stats.end()

    window.requestAnimationFrame(tick)
}
tick()


window.addEventListener("resize", () => {
    sizes.width = document.body.offsetWidth;
    sizes.height = document.body.offsetHeight;

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera)
})

window.addEventListener("dblclick", () => {
    document.fullscreenElement !== null ? document.exitFullscreen() : renderElement.requestFullscreen()
})