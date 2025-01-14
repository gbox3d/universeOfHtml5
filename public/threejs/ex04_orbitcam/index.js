import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


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

    // Orbit(구체 궤적) 모드용 컨트롤
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0, 0);
    orbitControls.maxDistance = 400;
    orbitControls.minDistance = 10;
    orbitControls.enablePan = false;
    orbitControls.enabled = true;   // 기본적으로 켜두기
    orbitControls.update();

    // Look around(고정 시점 회전) 모드용 컨트롤
    const lookControls = new OrbitControls(camera, renderer.domElement);
    lookControls.enablePan = true;
    lookControls.enableZoom = false;
    lookControls.target.copy(camera.position);
    lookControls.target.z -= 0.01;
    lookControls.enabled = false;   // 기본적으로 꺼두기

    // ----- GUI 생성 -----
    const gui = new GUI();
    const modeParams = {
        mode: 'Orbit'  // 초기에 'Orbit' 모드
    };

    // dat.GUI 셀렉트 박스나 라디오 버튼처럼 사용할 수 있음
    gui.add(modeParams, 'mode', ['Orbit', 'LookAround']).onChange((value) => {
        if (value === 'Orbit') {
            orbitControls.enabled = true;
            lookControls.enabled = false;
            orbitControls.update();
        } else {
            orbitControls.enabled = false;
            lookControls.enabled = true;
            // 카메라 위치에 맞춰서 lookControls.target을 재조정하려면 필요 시 업데이트
            lookControls.target.copy(camera.position);
            lookControls.target.z -= 0.01;
            lookControls.update();
        }
    }); 

    // window resize event
    window.addEventListener('resize', () => {
        {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }
    });


    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();


        renderer.render(scene, camera);

        // lookControls.update(delta);
    }

    animate();


}

export default main;