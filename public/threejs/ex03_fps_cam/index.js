import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

async function main() {

    //version
    console.log(THREE.REVISION);


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 2, 0);
    scene.add(cube);

    // grid helper
    const gridHelper = new THREE.GridHelper(100, 100);
    scene.add(gridHelper);

    // PointerLock 관련 이벤트 등록
    const canvas = renderer.domElement;

    // FirstPersonControls 초기화
    const controls = new FirstPersonControls(camera, renderer.domElement);

    // 이동/회전 속도 설정
    controls.movementSpeed = 2.0; // 키보드 이동 속도
    controls.lookSpeed = 0.1;     // 마우스 회전 속도
    controls.lookVertical = true; // 수직 회전 허용 (기본값 true)
    // 기본 상태에서는 마우스 포인터를 움직여도 카메라가 회전하지 않도록 비활성화
    
    //esc 누루면 컨트롤 멈춤
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            if(controls.enabled)
                controls.enabled = false;
            else
                controls.enabled = true;
        }
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        //초당 90도 회전
        cube.rotation.y += (THREE.MathUtils.degToRad(90)) * delta;


        // 기존: fpsController.update(delta);
        controls.update(delta); // FirstPersonControls 업데이트

        renderer.render(scene, camera);
    }

    animate();
}

export default main;