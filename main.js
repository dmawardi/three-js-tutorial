import "./style.css";
import * as THREE from "three";
import { AmbientLight, PointLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

// accepts four arguments: field of view, aspect ratio, and 2 args for view frustum
// (controls distance at which user can see objects relativce to camera)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// renders image
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

// set pixel ratio to exual the device's
renderer.setPixelRatio(window.devicePixelRatio);
// make full screen by making render size screen size
renderer.setSize(window.innerWidth, window.innerHeight);

// center rendered screen size based on css settings
camera.position.setZ(30);

// draw using scene and camera
renderer.render(scene, camera);

// Completion of setup of render

// Create a ring geometry object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// many materials contained within Three. You can also make custom
// basic material doesn't require light source: MeshBasicMaterial
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  // gives wireframe to better see geometry
  // wireframe: true,
});
// combine geometry with material to create mesh
const torus = new THREE.Mesh(geometry, material);

torus.position.x += 10;
torus.position.z += 10;
// add to scene (will be seen upon next render)
scene.add(torus);

// pointlight is equivalent to a lightbulb
// 0x means we are using hexadecimal value instead of number
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

// ambient light lights everything in scene
const ambientLight = new THREE.AmbientLight(0xffffff);
// add lighting to scene
scene.add(pointLight, ambientLight);

// Helpers
// light helper tools are available for all light types
// const lightHelper = new THREE.PointLightHelper(pointLight);
// // draws 2d grid along screen
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// takes camera and dom element from render as arg
// listens to mouse through dom element and affects camera
const controls = new OrbitControls(camera, renderer.domElement);

// randomly place stars
Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load("./assets/space.jpg");
// apply to scene
scene.background = spaceTexture;

// Texture mapping: Use 2d image to cover 3d object
// profile box
const myTexture = new THREE.TextureLoader().load("./assets/profile.png");
const profileBox = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  // map is for texture mapping
  new THREE.MeshBasicMaterial({ map: myTexture })
);
scene.add(profileBox);

// Moon
const moonTexture = new THREE.TextureLoader().load("./assets/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("./assets/normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);
moon.position.z = 30;
moon.position.setX(-10);

profileBox.position.z = -10;
profileBox.position.x = 7;
profileBox.position.y = -2;

scene.add(moon);

animate();

// event handler for when user scrolls
document.body.onscroll = moveCamera;

function moveCamera() {
  // getBoundingClient().top will get distance of viewport from top of page
  const top = document.body.getBoundingClientRect().top;

  // moon rotation
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // profileBox
  profileBox.rotation.x += 0.01;
  profileBox.rotation.y += 0.01;

  // camera
  // top is always positive, so multiply with neg
  camera.position.x = top * -0.0002;
  camera.position.y = top * -0.0002;
  camera.position.z = top * -0.033;
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // use math util from three to random generate xyz (-100-+100)
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function animate() {
  // tell browser that this function will be what is used as animation frame
  requestAnimationFrame(animate);

  // Torus animation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // moon rotation
  moon.rotation.x += 0.005;

  // reflect camera changes from orbit controls with each animation update
  // controls.update();

  // render
  renderer.render(scene, camera);
}
