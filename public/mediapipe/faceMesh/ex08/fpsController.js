import * as THREE from "three";
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/PointerLockControls.js';

export default function setup({ camera, renderer,moveSpeed=0.1 }) {
    // --- PointerLockControls(FPS 카메라) ---
    const controls = new PointerLockControls(camera, renderer.domElement);

    // 화면 클릭 시 Pointer Lock 활성화
    document.addEventListener('click', () => {
        controls.lock(); // 마우스 커서 숨김 & 1인칭 시점 제어
    });

    // 속도 조절용
    // const moveSpeed = 5.0; // 1초당 이동 거리
    let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

    // 키 눌렀을 때
    const onKeyDown = (event) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;
        }
    };

    // 키 뗐을 때
    const onKeyUp = (event) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return {
        update: (delta) => {
            if (!controls.isLocked) return;

            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction); // 카메라의 전방 벡터
            // direction.y = 0; // 수평 이동만 하도록 y축 제거
            direction.normalize();

            const right = new THREE.Vector3();
            right.crossVectors(camera.up, direction).normalize(); // 카메라의 오른쪽 벡터

            let moveVector = new THREE.Vector3();
            if (moveForward) moveVector.add(direction);
            if (moveBackward) moveVector.sub(direction);
            if (moveLeft) moveVector.add(right);
            if (moveRight) moveVector.sub(right);

            if (moveVector.lengthSq() > 0) {
                moveVector.normalize(); // 대각선 이동 시 속도 조정
                moveVector.multiplyScalar(moveSpeed * delta);
                camera.position.add(moveVector);
            }
        }
    }
}
