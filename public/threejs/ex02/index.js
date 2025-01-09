import * as THREE from 'three';

async function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 3축 그룹 생성
    const axisGroup = new THREE.Group();

    const arrowSize = 2; // 화살표 길이

    // X축 (빨간색)
    const xArrow = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0), // X축 방향
        new THREE.Vector3(0, 0, 0), // 시작 위치
        arrowSize, // 길이
        0xff0000 // 색상 (빨강)
    );
    axisGroup.add(xArrow);

    // Y축 (초록색)
    const yArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0), // Y축 방향
        new THREE.Vector3(0, 0, 0), // 시작 위치
        arrowSize, // 길이
        0x00ff00 // 색상 (초록)
    );
    axisGroup.add(yArrow);

    // Z축 (파란색)
    const zArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, 1), // Z축 방향
        new THREE.Vector3(0, 0, 0), // 시작 위치
        arrowSize, // 길이
        0x0000ff // 색상 (파랑)
    );
    axisGroup.add(zArrow);

    // 그룹을 씬에 추가
    scene.add(axisGroup);



    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // 큐브의 회전값을 그룹에 적용 (set 메서드 사용)
        axisGroup.rotation.set(cube.rotation.x, cube.rotation.y, cube.rotation.z);

        renderer.render(scene, camera);
    }

    animate();
}

export default main;