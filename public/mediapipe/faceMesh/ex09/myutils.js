import * as THREE from "three";

function createArrow({ color,arrowSize,arrowThickness }) {
    const material = new THREE.MeshBasicMaterial({ color });
    const geometry = new THREE.CylinderGeometry(arrowThickness, arrowThickness, arrowSize, 16);
    const arrow = new THREE.Mesh(geometry, material);

    // 화살촉 (Cone)
    const headGeometry = new THREE.ConeGeometry(arrowThickness*3,arrowThickness*6, 32);
    const headMaterial = new THREE.MeshBasicMaterial({ color });
    const headMesh = new THREE.Mesh(headGeometry, headMaterial);
    headMesh.position.y = arrowSize * 0.5;
    arrow.add(headMesh);

    return arrow;
}

function createArrowAxies({arrowSize=2,arrowThickness=0.1}) {
    const axisGroup = new THREE.Group();

    const dummy = new THREE.Group();

    // 3축 방향 화살표 그룹 생성 (두꺼운 메쉬 사용)
    // const arrowSize = 2;
    // const arrowThickness = 0.1;

    

    const xArrow = createArrow({ color: 0xff0000,arrowSize,arrowThickness }); // X축 (빨강)

    //z 축으로 90 회전
    xArrow.rotation.z = Math.PI * 0.5;
    dummy.add(xArrow);

    const yArrow = createArrow({ color: 0x00ff00,arrowSize,arrowThickness }); // Y축 (초록)
    dummy.add(yArrow);

    const zArrow = createArrow({ color: 0x0000ff,arrowSize,arrowThickness }); // Z축 (파랑)
    //x 축으로 90 회전
    zArrow.rotation.x = Math.PI * 0.5;
    dummy.add(zArrow);

    // dummy.add(xArrow, yArrow, zArrow);
    axisGroup.add(dummy);
    // scene.add(axisGroup);

    return axisGroup;
}

export { createArrow,createArrowAxies };
