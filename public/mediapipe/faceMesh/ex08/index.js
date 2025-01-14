import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';

import * as THREE from "three";


import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


let faceLandmarker;
const video = document.getElementById('webcam');
const clock = new THREE.Clock();



async function main() {

    //threejs version 표기
    console.log(THREE.REVISION);

    //three.js 코드
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, -1);  // 적절한 위치로 변경

    //lookAt 설정
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // 그림자 활성화
    document.body.appendChild(renderer.domElement);


    //그리드헬퍼
    var helper = new THREE.GridHelper(10, 10, 0x00ff00, 0xff0000);
    scene.add(helper);

    // GUI 설정
    const gui = new GUI({ width: 300 });
    const cameraPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    gui.add(cameraPosition, 'x').listen();
    gui.add(cameraPosition, 'y').listen();
    gui.add(cameraPosition, 'z').listen();

    gui.close();

    // fpsController를 초기화
    // const fpsController = setupFPSController({ camera, renderer, moveSpeed: 2.0 });

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.maxDistance = 100;
    controls.minDistance = 1;
    controls.enablePan = false;
    controls.update();


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

    //홍체를 표현하기 위해 구 만들기
    const irisGeometry = new THREE.SphereGeometry(0.01, 32, 32);
    const irisMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const irisLeft = new THREE.Mesh(irisGeometry, irisMaterial);
    const irisRight = new THREE.Mesh(irisGeometry, irisMaterial);
    scene.add(irisLeft);
    scene.add(irisRight);

    function get_iris_position(landmarks, connections) {
        const irisPosition = new THREE.Vector3();

        let totalCount = 0;

        connections.forEach((c) => {
            // start
            const s = landmarks[c.start];
            const sx = -(s.x - 0.5);
            const sy = -(s.y - 0.5);
            const sz = s.z;

            irisPosition.x += sx;
            irisPosition.y += sy;
            irisPosition.z += sz;
            totalCount++;

            // end
            const e = landmarks[c.end];
            const ex = -(e.x - 0.5);
            const ey = -(e.y - 0.5);
            const ez = e.z;

            irisPosition.x += ex;
            irisPosition.y += ey;
            irisPosition.z += ez;
            totalCount++;
        });

        // 이제 totalCount = connections.length * 2
        irisPosition.x /= totalCount;
        irisPosition.y /= totalCount;
        irisPosition.z /= totalCount;

        return irisPosition;
    }


    //눈에 대한 지오메트리
    const eye_geometry = new THREE.SphereGeometry(0.005, 32, 32);
    const eye_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // FaceLandmarker.FACE_LANDMARKS_LEFT_EYE 눈의 외각선을 표시하기위해 포인트만큼 구체 생성
    const left_eye_group = new THREE.Group();
    FaceLandmarker.FACE_LANDMARKS_LEFT_EYE.forEach((point) => {
        const eye = new THREE.Mesh(eye_geometry, eye_material);
        left_eye_group.add(eye);
    });
    scene.add(left_eye_group);

    // FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE 눈의 외각선을 표시하기위해 포인트만큼 구체 생성
    const right_eye_group = new THREE.Group();
    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE.forEach((point) => {
        const eye = new THREE.Mesh(eye_geometry, eye_material);
        right_eye_group.add(eye);
    });
    scene.add(right_eye_group);

    const processFrame = async () => {
        const results = await faceLandmarker.detectForVideo(video, performance.now());

        try {

            if (results.faceLandmarks && results.faceLandmarks.length > 0) {
                // 예: 가장 첫 번째 얼굴만 사용한다고 가정
                const landmarks = results.faceLandmarks[0];

                const leftIrisPosition = get_iris_position(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS);
                const rightIrisPosition = get_iris_position(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS);

                irisRight.position.copy(leftIrisPosition);
                irisLeft.position.copy(rightIrisPosition);

                // 왼쪽 눈의 외각선을 표시하기위해 포인트만큼 구체 생성
                left_eye_group.children.forEach((eye, index) => {
                    const point = landmarks[FaceLandmarker.FACE_LANDMARKS_LEFT_EYE[index].start];
                    eye.position.set(-(point.x - 0.5), -(point.y - 0.5), point.z);
                });

                // 왼쪽 눈의 외각선을 표시하기위해 포인트만큼 구체 생성
                right_eye_group.children.forEach((eye, index) => {
                    const point = landmarks[FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE[index].start];
                    eye.position.set(-(point.x - 0.5), -(point.y - 0.5), point.z);
                });


            }

        }
        catch (error) {
            console.error(error);
        }

        requestAnimationFrame(processFrame);
    };


    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        video.addEventListener('loadeddata', () => {
            processFrame();
        });
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }

    function animate() {
        requestAnimationFrame(animate);

        // 매 프레임마다 delta(프레임 간격) 계산
        const delta = clock.getDelta();

        // fpsController 갱신
        // fpsController.update(delta);

        cameraPosition.x = camera.position.x;
        cameraPosition.y = camera.position.y;
        cameraPosition.z = camera.position.z;

        renderer.render(scene, camera);
    }
    animate();

}
export default main;