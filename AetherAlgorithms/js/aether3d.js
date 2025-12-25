import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/geometries/TextGeometry.js';

let scene, camera, renderer;
let letters = [];
const clock = new THREE.Clock();

init();
animate();

function init() {
  const canvas = document.getElementById('aether-3d');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 80;

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // light
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const light = new THREE.DirectionalLight(0xffffff, 0.6);
  light.position.set(0, 1, 1);
  scene.add(light);

  // font
  const loader = new FontLoader();
  loader.load(
    'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/fonts/helvetiker_regular.typeface.json',
    font => createText(font)
  );

  window.addEventListener('resize', onResize);
}

function createText(font) {
  const text = 'AETHER';

  text.split('').forEach((char, i) => {
    const geometry = new TextGeometry(char, {
      font: font,
      size: 10,
      height: 2,
      curveSegments: 8
    });

    geometry.center();

    const material = new THREE.MeshStandardMaterial({
      color: 0x00f2ff,
      transparent: true,
      opacity: 0.65
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
      (i - 2.5) * 23,
      Math.random() * 40 - 20,
      Math.random() * -60
    );

    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.x = Math.random() * 0.5;

    scene.add(mesh);
    letters.push(mesh);
  });
}

function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();

  letters.forEach((letter, i) => {
    letter.position.y += Math.sin(t + i) * 0.01;
    letter.rotation.y += 0.001;
    letter.rotation.x += 0.0005;
  });

  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
