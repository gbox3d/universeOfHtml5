import { FilesetResolver, FaceLandmarker } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";

const canvas = document.getElementById("output");
const ctx = canvas.getContext("2d");
const uploadInput = document.getElementById("upload");

let faceLandmarker; // 전역 변수로 선언



/**
 * 랜드마크 인덱스 쌍(Edge) 목록을 canvas에 그려주는 함수
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas의 2D Context
 * @param {Array} landmarks - FaceLandmarker.detect() 결과로 얻은 얼굴 랜드마크 배열
 * @param {Array} edges - {start: number, end: number} 형태의 엣지 목록
 * @param {number} width - 캔버스의 가로 길이
 * @param {number} height - 캔버스의 세로 길이
 * @param {string} [strokeColor='red'] - 선 색상
 * @param {number} [lineWidth=2] - 선 두께
 */
function drawEdges(ctx, landmarks, edges, width, height, strokeColor = "red", lineWidth = 2) {
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;

    // edge마다 두 점을 연결
    edges.forEach(({ start, end }) => {
        const p1 = landmarks[start];
        const p2 = landmarks[end];

        // 랜드마크 좌표 -> canvas 좌표
        const x1 = p1.x * width;
        const y1 = p1.y * height;
        const x2 = p2.x * width;
        const y2 = p2.y * height;

        // 선 긋기
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    });

    ctx.stroke();
}





// 초기화
async function main() {
    // 1. VisionTasks 초기화
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    // 2. FaceLandmarker 초기화
    faceLandmarker = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
                delegate: "GPU" // GPU 사용
            },
            outputFaceBlendshapes: true,
            outputFacialTransformationMatrixes: true,
            
            runningMode: "IMAGE", // "IMAGE" or "VIDEO"
            numFaces: 1 // 탐지할 얼굴 수
        }
    );

    // faceLandmarker가 초기화되었는지 확인
    if (!faceLandmarker) {
        console.error("FaceLandmarker is not initialized");
        return;
    }
    else {
        console.log("FaceLandmarker is initialized");
    }

    //이미지 로드
    const img = new Image();
    // img.src = URL.createObjectURL(imageFileUrl);
    img.src = "/moon.webp";

    img.onload = async () => {
        // 캔버스 크기 설정
        canvas.width = img.width;
        canvas.height = img.height;

        // 이미지 그리기
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // 랜드마크 추출
        const results = await faceLandmarker.detect(img);
        if (results.faceLandmarks) {

            console.log(results.faceLandmarks);
            // drawLandmarks(canvas, results.faceLandmarks);

            // 랜드마크 그리기
            results.faceLandmarks.forEach((landmarks) => {

                console.log(landmarks);

                console.log(FaceLandmarker.FACE_LANDMARKS_LEFT_EYE)

                drawEdges(ctx, landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, img.width, img.height, "rgb(255,255, 0)");
                drawEdges(ctx, landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, img.width, img.height, "rgb(255,255, 0)");

                drawEdges(ctx, landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, img.width, img.height, "rgb(255,0, 0)");


            });

            console.log(results.faceBlendshapes);

            console.log(results.facialTransformationMatrixes);


        }
    };


}

export default main;
