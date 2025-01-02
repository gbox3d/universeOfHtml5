import { FilesetResolver, FaceLandmarker } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";

const canvas = document.getElementById("output");
const ctx = canvas.getContext("2d");
const uploadInput = document.getElementById("upload");

let faceLandmarker; // 전역 변수로 선언

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
            runningMode: "IMAGE", // "IMAGE" or "VIDEO"
            numFaces: 1 // 탐지할 얼굴 수
        }
    );

    // 파일 업로드 이벤트
    uploadInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
            // 캔버스 크기 설정
            canvas.width = img.width;
            canvas.height = img.height;

            // 이미지 그리기
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // faceLandmarker가 초기화되었는지 확인
            if (!faceLandmarker) {
                console.error("FaceLandmarker is not initialized");
                return;
            }

            // 랜드마크 추출
            const results = await faceLandmarker.detect(img);
            if (results.faceLandmarks) {

                console.log(results.faceLandmarks);
                drawLandmarks(canvas, results.faceLandmarks);
            }
        };
    });

    // 랜드마크 그리기
    function drawLandmarks(canvas, landmarks) {
        const ctx = canvas.getContext("2d");

        // 랜드마크 점 표시
        landmarks.forEach(landmark => {
            landmark.forEach(point => {
                const x = point.x * canvas.width; // 정규화된 x 좌표
                const y = point.y * canvas.height; // 정규화된 y 좌표
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, 2 * Math.PI); // 반지름 2로 점 그리기
                ctx.fillStyle = "red"; // 색상
                ctx.fill();
            });
        });
    }
}

export default main;
