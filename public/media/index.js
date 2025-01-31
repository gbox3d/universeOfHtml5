const myFace = document.getElementById("myFace");
const cameraSelect = document.getElementById("cameraSelect");

async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === "videoinput");

        cameraSelect.innerHTML = ""; // 기존 옵션 초기화

        videoDevices.forEach((device, index) => {
            const option = document.createElement("option");
            option.value = device.deviceId;
            option.innerText = device.label || `Camera ${index + 1}`;
            cameraSelect.appendChild(option);
        });
    } catch (e) {
        console.error("카메라 목록을 가져오는 중 오류 발생:", e);
    }
}

async function startCamera(deviceId = null) {
    const constraints = {
        audio: false,
        video: deviceId ? { deviceId: { exact: deviceId } } : true
    };

    try {
        let myStream = await navigator.mediaDevices.getUserMedia(constraints);
        myFace.srcObject = myStream;
        console.log("카메라 연결 성공");
    } catch (e) {
        console.error("카메라 연결 실패:", e);
    }
}

async function main() {
    await getCameras(); // 카메라 목록 가져오기
    await startCamera(); // 기본 카메라 실행

    cameraSelect.addEventListener("change", async () => {
        await startCamera(cameraSelect.value); // 선택된 카메라 실행
    });
}

export default main;
