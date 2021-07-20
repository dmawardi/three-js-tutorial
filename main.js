import "./style.css";
import * as THREE from "tree";

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
const renderer = new THREE.WebGlRenderer({
  canvas: document.querySelector("#bg"),
});

// set pixel ratio to exual the device's
renderer.setPixelRatio(window.devicePixelRatio);
// make full screen by making render size screen size
renderer.setSize(window.innerWidth, window.innerHeight);

// center rendered screen size based on css settings
camera.position.setZ(30);

// draw using scene and camera
renderer.render(acene, camera);

// Completion of setup of render
