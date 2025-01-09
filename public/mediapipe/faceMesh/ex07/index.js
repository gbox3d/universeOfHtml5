import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';

import * as THREE from "three";

import { GUI } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/libs/lil-gui.module.min.js';

import setupFPSController from './fpsController.js';
import faceMeshIndex from './faceMeshIndex.js';

let faceLandmarker;
const video = document.getElementById('webcam');
const clock = new THREE.Clock();

async function main() {

    //threejs version 표기
    console.log(THREE.REVISION);

    //three.js 코드
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = -2;
    camera.position.y = 0;

    //lookAt 설정
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // axisGroup 생성
    // const axisGroup = createArrowAxies({ arrowSize: 2, arrowThickness: 0.1 });

    // scene.add(axisGroup);

    // ----------------
    // 바닥(플레인) 추가
    // ----------------

    //그리드헬퍼
    var helper = new THREE.GridHelper(100, 10, 0x00ff00, 0xff0000);
    scene.add(helper);


    // GUI 설정
    const gui = new GUI({ width: 300 });
    const cameraPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    gui.add(cameraPosition, 'x').listen();
    gui.add(cameraPosition, 'y').listen();
    gui.add(cameraPosition, 'z').listen();

    // // axisGroup 위치 GUI에 추가
    // const axisGroupPosition = { x: axisGroup.position.x, y: axisGroup.position.y, z: axisGroup.position.z };
    // gui.add(axisGroupPosition, 'x').listen();
    // gui.add(axisGroupPosition, 'y').listen();
    // gui.add(axisGroupPosition, 'z').listen();


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



    // 1️⃣ BufferGeometry 생성 (메쉬 형태)
    const faceGeometry = new THREE.BufferGeometry();

    // 2️⃣ FACE_LANDMARKS_TESSELATION을 사용하여 positions & indices 배열 생성
    const faceTesselationIndices = FaceLandmarker.FACE_LANDMARKS_TESSELATION;
    const positions = new Float32Array(468 * 3); // x, y, z 좌표 저장
    const indices = new Uint16Array(faceTesselationIndices.length * 3); // 삼각형 인덱스 저장

    // 3️⃣ 처음에는 "평면(z=0)"으로 초기화
    for (let i = 0; i < 468; i++) {
        const baseX = (i % 20) * 0.01 - 0.5;  // 20개 단위로 좌우 정렬
        const baseY = Math.floor(i / 20) * -0.01 + 0.5; // 위에서 아래로 정렬
        const baseZ = 0; // 평면

        positions[i * 3] = baseX;
        positions[i * 3 + 1] = baseY;
        positions[i * 3 + 2] = baseZ;
    }

    // 4️⃣ 삼각형 인덱스 설정 (3개씩 묶어서 삼각형 생성)
    for (let i = 0; i < faceTesselationIndices.length; i++) {
        indices[i * 3] = faceTesselationIndices[i].start;
        indices[i * 3 + 1] = faceTesselationIndices[i].end;
        indices[i * 3 + 2] = faceTesselationIndices[(i + 1) % faceTesselationIndices.length].end; // 다음 점을 삼각형의 세 번째 점으로
    }

    // 5️⃣ Three.js BufferGeometry에 적용
    faceGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    faceGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
    faceGeometry.computeVertexNormals(); // 표면 법선 계산

    // 6️⃣ 재질(Material) 설정 (기본 색상 & 투명도 설정)
    const faceMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00, // 초록색
        wireframe: true, // 와이어프레임 모드 (true면 삼각형 경계를 볼 수 있음)
    });

    // 7️⃣ Mesh 생성 & Scene에 추가
    const faceMesh = new THREE.Mesh(faceGeometry, faceMaterial);
    scene.add(faceMesh);


    const processFrame = async () => {
        const results = await faceLandmarker.detectForVideo(video, performance.now());

        try {

            if (results.faceLandmarks && results.faceLandmarks.length > 0) {
                const landmarks = results.faceLandmarks[0];

                // BufferGeometry에서 position 속성 가져오기
                const positions = faceMesh.geometry.attributes.position.array;


                // 468개의 landmark를 기반으로 선(Edge) 업데이트
                for (let i = 0; i < faceTesselationIndices.length; i++) {
                    const { start, end } = faceTesselationIndices[i];

                    const startPoint = landmarks[start];
                    const endPoint = landmarks[end];

                    const index = i * 6;

                    // 시작점 (x, y, z)
                    positions[index + 0] = (startPoint.x - 0.5);
                    positions[index + 1] = -(startPoint.y - 0.5);
                    positions[index + 2] = startPoint.z;

                    // 끝점 (x, y, z)
                    positions[index + 3] = endPoint.x - 0.5;
                    positions[index + 4] = -(endPoint.y - 0.5);
                    positions[index + 5] = endPoint.z;
                }

                // 업데이트 반영
                faceMesh.geometry.attributes.position.needsUpdate = true;

                // 3️⃣ 바운딩 박스 재계산
                faceMesh.geometry.computeBoundingBox(); // 정점이 변경되었으므로 바운딩 박스를 다시 계산


            }

        }
        catch (error) {
            console.error(error);
        }


        // if (results.facialTransformationMatrixes.length > 0) {

        //     const matrix = results.facialTransformationMatrixes[0];
        //     const m = matrix.data; // 4x4 행렬

        //     // Three.js에서 사용할 Matrix4 생성
        //     const transformationMatrix = new THREE.Matrix4();
        //     transformationMatrix.set(
        //         m[0], m[4], m[8], m[12],  // 1열 (X축)
        //         m[1], m[5], m[9], m[13],  // 2열 (Y축)
        //         m[2], m[6], m[10], m[14],  // 3열 (Z축)
        //         m[3], m[7], m[11], m[15]   // 4열 (W)
        //     );


        //     // axisGroup의 자동 행렬 업데이트 비활성화
        //     axisGroup.matrixAutoUpdate = false;

        //     // 변환 행렬 설정
        //     axisGroup.matrix.copy(transformationMatrix);

        //     // 월드 행렬 업데이트 플래그 설정
        //     axisGroup.matrixWorldNeedsUpdate = true;

        // }
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