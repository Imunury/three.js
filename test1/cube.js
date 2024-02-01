import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

// 기본적인 렌더러, 카메라, 장면 설정
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 물체(수조)와 물의 표면을 생성
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const waterGeometry = new THREE.PlaneGeometry(10, 10);
const waterMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = - Math.PI / 2; // 물 표면을 수평으로 설정
water.position.y = 1; // 초기 수위 설정
scene.add(water);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 관성 효과
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 10;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

camera.position.z = 15;

// 물 수위 조절 함수
function setWaterLevel(level) {
    water.position.y = level;
}

// 렌더링 루프
function animate() {
    requestAnimationFrame(animate);

	// 컨트롤 업데이트
    controls.update();

    // 렌더링
    renderer.render(scene, camera);
}

animate();

// 물 수위 조절 예시
setInterval(() => {
    // 물 수위를 랜덤하게 조절
    setWaterLevel(Math.random() * 5);
}, 1000);