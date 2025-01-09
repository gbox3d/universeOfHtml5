import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';

import * as THREE from "three";

import { GUI } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/libs/lil-gui.module.min.js';

import setupFPSController from './fpsController.js';
import faceMeshIndex from './faceMeshIndex.js';

let faceLandmarker;
const video = document.getElementById('webcam');
const clock = new THREE.Clock();

function _initFaceMesh(scene) {
    //FaceMesh Geometry 설정
    const positions = new Float32Array(468 * 3);
    const flatIndices = faceMeshIndex.flat();
    const indexArray = new Uint16Array(flatIndices);

    // 삼각형 인덱스 순서 바꾸기 (삼각형 뒤집기)
    // for (let i = 0; i < indexArray.length; i += 3) {
    //     // [i, i+1, i+2] => 삼각형 한 개
    //     // swap indexArray[i+1] <-> indexArray[i+2]
    //     const temp = indexArray[i + 1];
    //     indexArray[i + 1] = indexArray[i + 2];
    //     indexArray[i + 2] = temp;
    // }

    const faceGeometry = new THREE.BufferGeometry();
    faceGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    faceGeometry.setIndex(new THREE.BufferAttribute(indexArray, 1));
    faceGeometry.computeVertexNormals(); // 표면을 부드럽게

    //**재질(Material) 변경**
    const faceMaterial = new THREE.MeshStandardMaterial({
        color: 0xffddaa,  // 피부색 계열
        metalness: 0.3,  // 금속 효과 조정
        roughness: 0.5,  // 거칠기 조정 (0이면 완전 반사, 1이면 완전 무광)
        transparent: true,
        opacity: 0.95,  // 반투명 효과
    });

    // Mesh 생성 및 추가
    const faceMesh = new THREE.Mesh(faceGeometry, faceMaterial);
    faceMesh.castShadow = true; // 그림자 캐스팅
    faceMesh.receiveShadow = true; // 그림자 받기
    scene.add(faceMesh);

    return {
        mesh: faceMesh,
        update: (landmarks) => {
            const posArray = faceMesh.geometry.attributes.position.array;

            // 468개 랜드마크 업데이트
            for (let i = 0; i < 468; i++) {
                posArray[i * 3] = -(landmarks[i].x - 0.5);    // X
                posArray[i * 3 + 1] = -(landmarks[i].y - 0.5); // Y (수직 반전)
                posArray[i * 3 + 2] = landmarks[i].z * 0.3;  // Z 보정
            }

            // 🔄 **정점 좌표 업데이트**
            faceMesh.geometry.attributes.position.needsUpdate = true;

            // 🔄 **법선 업데이트 (빛 반사)**
            faceMesh.geometry.computeVertexNormals();

            // 🔄 **바운딩 박스 업데이트 (충돌 감지 & 카메라 최적화)**
            faceMesh.geometry.computeBoundingBox();

        }
    }
}

function _initLight(scene) {
    // 5️⃣ **조명 추가**
    // 🔆 환경광 (전체적인 밝기)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // 🔦 방향성 조명 (햇빛 같은 효과)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2); // 위쪽에서 비추게 설정
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 💡 포인트 라이트 (얼굴에 은은한 빛 추가)
    const pointLight = new THREE.PointLight(0xffaa88, 1, 5);
    pointLight.position.set(0, 0, -2); // 얼굴 앞쪽에서 비춤
    scene.add(pointLight);
}


async function main() {

    //threejs version 표기
    console.log(THREE.REVISION);

    //three.js 코드
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, -2);  // 적절한 위치로 변경

    //lookAt 설정
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // 그림자 활성화
    document.body.appendChild(renderer.domElement);


    //그리드헬퍼
    var helper = new THREE.GridHelper(100, 10, 0x00ff00, 0xff0000);
    scene.add(helper);

    // document.addEventListener('keydown', async (event) => {

    //     console.log(event.code);
    //     if (event.code === 'Space') {

    //         // 1) Mediapipe 호출 (단발성)
    //         const results = await faceLandmarker.detectForVideo(video, performance.now());

    //         // 2) 결과 해석
    //         if (results.faceLandmarks && results.faceLandmarks.length > 0) {
    //             // 가장 첫 번째 얼굴 기준
    //             const landmarks = results.faceLandmarks[0];

    //             // 3) 정적메쉬 생성
    //             const staticFaceMesh = createStaticFaceMesh(landmarks);

    //             // 4) 씬에 추가
    //             scene.add(staticFaceMesh);

    //             console.log('Added a static face mesh!');
    //         }

    //     }

    // });


    // GUI 설정
    const gui = new GUI({ width: 300 });
    const cameraPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    gui.add(cameraPosition, 'x').listen();
    gui.add(cameraPosition, 'y').listen();
    gui.add(cameraPosition, 'z').listen();

    const faceMeshObj = _initFaceMesh(scene);
    _initLight(scene);

    // fpsController를 초기화
    const fpsController = setupFPSController({ camera, renderer, moveSpeed: 2.0 });

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


    const processFrame = async () => {
        const results = await faceLandmarker.detectForVideo(video, performance.now());

        try {

            // 2) 결과 해석
            if (results.faceLandmarks && results.faceLandmarks.length > 0) {
                // 예: 가장 첫 번째 얼굴만 사용한다고 가정
                const landmarks = results.faceLandmarks[0];
                faceMeshObj.update(landmarks);
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
            // canvas.width = video.videoWidth;
            // canvas.height = video.videoHeight;

            processFrame();
        });
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }

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

        // const _axisGroupWorldPos = new THREE.Vector3();
        // axisGroup.getWorldPosition(_axisGroupWorldPos);

        // axisGroupPosition.x = _axisGroupWorldPos.x;
        // axisGroupPosition.y = _axisGroupWorldPos.y;
        // axisGroupPosition.z = _axisGroupWorldPos.z;


        renderer.render(scene, camera);
    }
    animate();

}
export default main;