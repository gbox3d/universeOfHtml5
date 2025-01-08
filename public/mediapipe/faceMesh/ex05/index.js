import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';



let faceLandmarker;
// let webcamRunning = false;
const video = document.getElementById('webcam');
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');



// roll/pitch/yaw 바를 모두 그려주는 함수
function drawBars(ctx, { rollDeg, pitchDeg, yawDeg }) {
    // 바 공통 설정
    const barWidth = 200;
    const barHeight = 20;

    // 왼쪽 상단 모서리 위치 (필요에 따라 레이아웃 조정)
    // roll -> 맨 위, pitch -> 그 아래, yaw -> 그 아래
    const startX = 20;
    let startY = canvas.height - 100; // 아래쪽에서 100px 위에서부터 시작

    // roll 바
    drawSingleBar(ctx, rollDeg, -180, 180, startX, startY, barWidth, barHeight, "Roll");
    startY += (barHeight + 10);  // 간격
    // pitch 바
    drawSingleBar(ctx, pitchDeg, -180, 180, startX, startY, barWidth, barHeight, "Pitch");
    startY += (barHeight + 10);
    // yaw 바
    drawSingleBar(ctx, yawDeg, -180, 180, startX, startY, barWidth, barHeight, "Yaw");
}

/**
 * 하나의 바를 그리는 함수
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} valueDeg    현재 각도(deg)
 * @param {number} minDeg      최소 범위(deg)
 * @param {number} maxDeg      최대 범위(deg)
 * @param {number} x           바 왼쪽 X 좌표
 * @param {number} y           바 왼쪽 Y 좌표
 * @param {number} width       바 전체 폭
 * @param {number} height      바 높이
 * @param {string} label       표기 라벨("Roll" / "Pitch" / "Yaw")
 */
function drawSingleBar(ctx, valueDeg, minDeg, maxDeg, x, y, width, height, label) {
    ctx.save();

    // 테두리(바 배경 틀) 먼저 그리기
    ctx.strokeStyle = "#000";
    ctx.strokeRect(x, y, width, height);

    // valueDeg -> ratio 변환
    // ratio = (value - min) / (max - min)
    const ratio = (valueDeg - minDeg) / (maxDeg - minDeg);
    const clampedRatio = Math.max(0, Math.min(1, ratio));

    // 실제 채워질 바의 폭
    const fillWidth = width * clampedRatio;

    // 바 채우기 (색상 임의)
    ctx.fillStyle = "#FF4444";
    ctx.fillRect(x, y, fillWidth, height);

    // 텍스트: label + 값 표시
    ctx.fillStyle = "#fff";
    ctx.font = "16px sans-serif";
    // 바 오른쪽에
    const text = `${label}: ${valueDeg.toFixed(1)}°`;
    ctx.fillText(text, x + width + 10, y + height - 3);

    ctx.restore();
}

/**
 * 4x4 행렬(row-major)에서 Translation, Rotation, Scale, Euler Angles 등을 추출
 * (이전 답변에서 사용했던 예시 함수 동일)
 */
function decomposeMatrix4x4(m) {
    const translation = {
        x: m[12],
        y: m[13],
        z: m[14],
    };

    let R = [
        [m[0], m[1], m[2]],
        [m[4], m[5], m[6]],
        [m[8], m[9], m[10]],
    ];

    // 스케일
    const sx = Math.hypot(R[0][0], R[0][1], R[0][2]);
    const sy = Math.hypot(R[1][0], R[1][1], R[1][2]);
    const sz = Math.hypot(R[2][0], R[2][1], R[2][2]);
    const scale = { x: sx, y: sy, z: sz };

    // 회전 행렬 정규화
    const EPSILON = 1e-8;
    if (sx > EPSILON) {
        R[0] = R[0].map((val) => val / sx);
    }
    if (sy > EPSILON) {
        R[1] = R[1].map((val) => val / sy);
    }
    if (sz > EPSILON) {
        R[2] = R[2].map((val) => val / sz);
    }

    // R 은 이제 순수 회전 행렬
    // 오일러 각 추출 (Tait-Bryan: Z-Y-X)
    const r00 = R[0][0], r01 = R[0][1], r02 = R[0][2];
    const r10 = R[1][0], r11 = R[1][1], r12 = R[1][2];
    const r20 = R[2][0], r21 = R[2][1], r22 = R[2][2];

    const sy2 = Math.hypot(r00, r10);
    let roll, pitch, yaw;
    if (sy2 > EPSILON) {
        roll = Math.atan2(r21, r22);
        pitch = Math.atan2(-r20, sy2);
        yaw = Math.atan2(r10, r00);
    } else {
        // 짐벌락
        roll = Math.atan2(-r12, r11);
        pitch = Math.atan2(-r20, sy2);
        yaw = 0;
    }

    const eulerAngles = { roll, pitch, yaw };

    return {
        translation,
        scale,
        rotationMatrix: R,
        eulerAngles,
    };
}



async function main() {

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
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            processFrame();
        });
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }

    const processFrame = async () => {
        const results = await faceLandmarker.detectForVideo(video, performance.now());

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (results.facialTransformationMatrixes.length > 0) {


            const matrix = results.facialTransformationMatrixes[0];
            const { translation, scale, rotationMatrix, eulerAngles } = decomposeMatrix4x4(matrix.data);



            // 실제로 찍어보니, pitch->roll, yaw->pitch, roll->yaw 식으로 뒤바뀌었다면
            // 최종적으로 아래처럼 재할당
            const correctedRoll = eulerAngles.yaw;
            const correctedPitch = eulerAngles.roll;
            const correctedYaw = eulerAngles.pitch;

            // 이제 correctedRoll, correctedPitch, correctedYaw를
            // 본인이 원하는 바 그래프/텍스트 등에 사용
            const rollDeg = correctedRoll * (180 / Math.PI);
            const pitchDeg = correctedPitch * (180 / Math.PI);
            const yawDeg = correctedYaw * (180 / Math.PI);

            

            // 세 개의 바를 모두 그리는 함수
            drawBars(ctx, { rollDeg, pitchDeg, yawDeg });



        }


        requestAnimationFrame(processFrame);
    };

}
export default main;