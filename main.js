import "./style.css";
import * as THREE from "three";

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
// basic material doesn't require light source
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  // gives wireframe to better see geometry
  wireframe: true,
});
// combine geometry with material to create mesh
const torus = new THREE.Mesh(geometry, material);

// add to scene (will be seen upon next render)
scene.add(torus);

animate();

function animate() {
  // tell browser that this function will be what is used as animation frame
  requestAnimationFrame(animate);
  // render
  renderer.render(scene, camera);
}
