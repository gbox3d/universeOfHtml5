import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';

import * as THREE from "three";

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createArrowAxies } from './myutils.js';


let faceLandmarker;
const video = document.getElementById('webcam');
const clock = new THREE.Clock();

async function main() {

    //threejs version 표기
    console.log(THREE.REVISION);

    //three.js 코드
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, -50);  // 적절한 위치로 변경

    //lookAt 설정
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // 그림자 활성화
    document.body.appendChild(renderer.domElement);


    //그리드헬퍼
    var helper = new THREE.GridHelper(50, 10, 0x00ff00, 0xff0000);
    helper.rotation.x = Math.PI / 2;
    scene.add(helper);

    // axisGroup 생성
    const axisGroup = createArrowAxies({ arrowSize: 2, arrowThickness: 0.1 });
    scene.add(axisGroup);

    // ✅ 충돌 위치에 빨간색 구 추가
    const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // 광선 표시를 위한 직선 추가
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const lineGeometry = new THREE.BufferGeometry();
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);



    // GUI 설정
    const gui = new GUI({ width: 300 });

    gui.close();

    // 📌 Camera Position (캠 포지션)
    const cameraFolder = gui.addFolder('📷 Camera Position');
    const cameraPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    cameraFolder.add(cameraPosition, 'x').listen();
    cameraFolder.add(cameraPosition, 'y').listen();
    cameraFolder.add(cameraPosition, 'z').listen();
    cameraFolder.open();

    // axisGroup 위치 GUI에 추가
    // 📌 Axis Group Position (페이스 포지션)
    const axisFolder = gui.addFolder('🎯 Axis Group Position');
    const axisGroupPosition = { x: axisGroup.position.x, y: axisGroup.position.y, z: axisGroup.position.z };
    axisFolder.add(axisGroupPosition, 'x').listen();
    axisFolder.add(axisGroupPosition, 'y').listen();
    axisFolder.add(axisGroupPosition, 'z').listen();
    axisFolder.open();

    // OrbitControls 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.maxDistance = 400;
    controls.minDistance = 10;
    controls.enablePan = false;
    controls.enabled = true;   // 기본적으로 켜두기
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



    const processFrame = async () => {
        const results = await faceLandmarker.detectForVideo(video, performance.now());

        try {

            if (results.faceLandmarks && results.faceLandmarks.length > 0) {

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

                    // 변환 행렬을 해석할 수 있도록 구성 요소 분리
                    const position = new THREE.Vector3();
                    const quaternion = new THREE.Quaternion();
                    const scale = new THREE.Vector3();

                    transformationMatrix.decompose(position, quaternion, scale);


                    // ✅ 정면 벡터 구하기
                    const forwardVector = new THREE.Vector3();
                    forwardVector.set(m[8], m[9], m[10]).normalize();

                    // ✅ 광선 시작점 (axisGroup 위치)
                    const rayOrigin = position

                    // ✅ 광선 생성
                    const ray = new THREE.Ray(rayOrigin, forwardVector);

                    // ✅ 평면 정의 (원점 기준, 법선이 (0,0,1)인 평면)
                    const planeNormal = new THREE.Vector3(0, 0, -1);
                    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, new THREE.Vector3(0, 0, 0));

                    // ✅ 광선과 평면의 교차점 계산
                    const intersectionPoint = new THREE.Vector3();
                    if (ray.intersectPlane(plane, intersectionPoint)) {
                        // console.log('평면과 충돌 위치:', intersectionPoint);
                        sphere.position.copy(intersectionPoint);

                        // ✅ 광선 시각화
                        const points = [];

                        // 시작점 (광선의 시작점)
                        points.push(rayOrigin.clone());

                        const rayEnd = intersectionPoint.clone();
                        points.push(rayEnd);

                        // 새로운 점들로 라인 업데이트
                        lineGeometry.setFromPoints(points);

                    }


                }


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

        // camera 표시를 위한 GUI 업데이트
        cameraPosition.x = camera.position.x;
        cameraPosition.y = camera.position.y;
        cameraPosition.z = camera.position.z;

        // axisGroup 위치를 GUI에 업데이트
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