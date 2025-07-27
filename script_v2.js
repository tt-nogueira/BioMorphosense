const simulate = document.getElementById('simulate-btn');
const fatP = document.getElementById('fat-percent');
const fatE = document.getElementById('fat-error');
const lean = document.getElementById('lean-mass');
const whrEl = document.getElementById('whr');
const cardio = document.getElementById('cardio-risk');
const metabolic = document.getElementById('metabolic');
const bias = document.getElementById('bias-status');

simulate.addEventListener('click', () => {
  const fat = (Math.random() * 15 + 12).toFixed(1);
  const err = (Math.random() * 1 + 0.5).toFixed(1);
  const leanMass = (Math.random() * 35 + 45).toFixed(1);
  const whr = (Math.random() * 0.2 + 0.85).toFixed(2);
  const met = (Math.random() * 400 + 1600).toFixed(0);
  const statusList = [
    'Representativo (alta confiança)',
    'Fora da faixa validada',
    'Confiança moderada'
  ];
  const status = statusList[Math.floor(Math.random() * statusList.length)];

  fatP.textContent = fat;
  fatE.textContent = err;
  lean.textContent = leanMass;
  whrEl.textContent = whr;
  metabolic.textContent = met;
  cardio.textContent = whr < 0.9 ? 'LOW' : whr < 1.0 ? 'MODERATE' : 'HIGH';
  bias.textContent = status;
});

// Three.js minimal visualization
const canvas = document.getElementById('viewer-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe1e4e9);
const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
camera.position.set(0, 1.6, 2);

scene.add(new THREE.HemisphereLight(0xffffff, 0x555555));
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(2, 2, 1);
scene.add(dir);

const loader = new THREE.GLTFLoader();
loader.load('https://raw.githubusercontent.com/hmthanh/3d-human-model/main/Thanh.glb', gltf => {
  const model = gltf.scene;
  model.scale.set(1.1, 1.1, 1.1);
  scene.add(model);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
