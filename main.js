import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup

const normalTexture = new THREE.TextureLoader().load('resources/normal1.jpg');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

//const material = new THREE.MeshStandardMaterial({ color: 0x999999});

const metalTexture = new THREE.TextureLoader().load('resources/grass.jpg');
//const normal3Texture = new THREE.TextureLoader().load('normal1.jpg');

//const torus = new THREE.Mesh(geometry, metalTexture);

const torus1 = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: metalTexture,
    normalMap: normalTexture,
  })
);

scene.add(torus1);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.21, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//add cats




// Background

const spaceTexture = new THREE.TextureLoader().load('resources/millySky.jpg');
scene.background = spaceTexture;

// Avatar
// const myUrl = 'https://raw.githubusercontent.com/SanjoyPator1/ThreeJSwebsite/main/sanjoy1.png'

const profTexture = new THREE.TextureLoader().load('resources/sp.jpg');

const prof = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: profTexture }));

scene.add(prof);

// Moon

const moonTexture = new THREE.TextureLoader().load('resources/moon.jpg');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

//sun
const sun1Texture = new THREE.TextureLoader().load('resources/sun.jpg');
//const normal1Texture = new THREE.TextureLoader().load('normal1.jpg');

const sun1 = new THREE.Mesh(
  new THREE.SphereGeometry(6, 62, 62),
  new THREE.MeshStandardMaterial({
    map: sun1Texture,
    normalMap: normalTexture,
  })
);

scene.add(sun1);

sun1.position.z = 30;
sun1.position.setX(-160);

//earth
const earthTexture = new THREE.TextureLoader().load('resources/earth1.jpg');
//const normal2Texture = new THREE.TextureLoader().load('normal1.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = 30;
earth.position.setX(-50);

//prof

prof.position.z = -5;
prof.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  sun1.rotation.x += 0.05;
  sun1.rotation.y += 0.075;
  sun1.rotation.z += 0.05;

  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  prof.rotation.y += 0.01;
  prof.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus1.rotation.x += 0.01;
  torus1.rotation.y += 0.005;
  torus1.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  sun1.rotation.y += 0.007;
  earth.rotation.z += 0.007;

  prof.rotation.x +=0.005;
  prof.rotation.y +=0.005;
  prof.rotation.z +=0.005;
  // controls.update();

  renderer.render(scene, camera);
}

animate();