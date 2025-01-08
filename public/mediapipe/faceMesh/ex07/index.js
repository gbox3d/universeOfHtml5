import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';

import * as THREE from "three";

import { GUI } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/libs/lil-gui.module.min.js';

import setupFPSController from './fpsController.js';
import { createArrowAxies } from './muutils.js';

let faceLandmarker;
const video = document.getElementById('webcam');
const clock = new THREE.Clock();

async function main() {

    //threejs version 표기
    console.log(THREE.REVISION);

    //three.js 코드
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = -50;
    camera.position.y = 15;

    //lookAt 설정
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // axisGroup 생성
    const axisGroup = createArrowAxies({ arrowSize: 2, arrowThickness: 0.1 });

    scene.add(axisGroup);

    // ----------------
    // 바닥(플레인) 추가
    // ----------------
    
    //그리드헬퍼
    var helper =  new THREE.GridHelper( 100,10,0x00ff00,0xff0000 );
    scene.add(helper);


    // GUI 설정
    const gui = new GUI({ width: 300 });
    const cameraPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    gui.add(cameraPosition, 'x').listen();
    gui.add(cameraPosition, 'y').listen();
    gui.add(cameraPosition, 'z').listen();

    // axisGroup 위치 GUI에 추가
    const axisGroupPosition = { x: axisGroup.position.x, y: axisGroup.position.y, z: axisGroup.position.z };
    gui.add(axisGroupPosition, 'x').listen();
    gui.add(axisGroupPosition, 'y').listen();
    gui.add(axisGroupPosition, 'z').listen();


    // fpsController를 초기화
    const fpsController = setupFPSController({ camera, renderer });

    // MediaPipe 코드
    const filesetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU',
        },
        outputFacialTransformationMatrixes: true,
        runningMode: 'VIDEO',
        numFaces: 5,
    });

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        video.addEventListener('loadeddata', () => {
            // canvas.width = video.videoWidth;
            // canvas.height = video.videoHeight;

            processFrame();
        });
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }

    const processFrame = async () => {
        const results = await faceLandmarker.detectForVideo(video, performance.now());



        if (results.facialTransformationMatrixes.length > 0) {

            const matrix = results.facialTransformationMatrixes[0];
            const m = matrix.data; // 4x4 행렬

            // Three.js에서 사용할 Matrix4 생성
            const transformationMatrix = new THREE.Matrix4();
            transformationMatrix.set(
                m[0], m[4], m[8], m[12],  // 1열 (X축)
                m[1], m[5], m[9], m[13],  // 2열 (Y축)
                m[2], m[6], m[10], m[14],  // 3열 (Z축)
                m[3], m[7], m[11], m[15]   // 4열 (W)
            );


            // axisGroup의 자동 행렬 업데이트 비활성화
            axisGroup.matrixAutoUpdate = false;

            // 변환 행렬 설정
            axisGroup.matrix.copy(transformationMatrix);

            // 월드 행렬 업데이트 플래그 설정
            axisGroup.matrixWorldNeedsUpdate = true;

        }
        requestAnimationFrame(processFrame);
    };

    function animate() {
        requestAnimationFrame(animate);
        // controls.update(); // OrbitControls 업데이트

        // 매 프레임마다 delta(프레임 간격) 계산
        const delta = clock.getDelta();

        // fpsController 갱신
        fpsController.update(delta);

        cameraPosition.x = camera.position.x;
        cameraPosition.y = camera.position.y;
        cameraPosition.z = camera.position.z;

        const _axisGroupWorldPos = new THREE.Vector3();
        axisGroup.getWorldPosition(_axisGroupWorldPos);

        axisGroupPosition.x = _axisGroupWorldPos.x;
        axisGroupPosition.y = _axisGroupWorldPos.y;
        axisGroupPosition.z = _axisGroupWorldPos.z;


        renderer.render(scene, camera);
    }
    animate();

}
export default main;