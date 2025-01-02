import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';

let faceLandmarker;
let webcamRunning = false;

async function main() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numFaces: 5,
    });

    setupWebcam();
}

async function setupWebcam() {
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        video.addEventListener('loadeddata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            webcamRunning = true;
            detectFaces(video, ctx, canvas);
        });
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
}

function detectFaces(video, ctx, canvas) {
    if (!webcamRunning) return;

    const processFrame = async () => {
        const results = await faceLandmarker.detectForVideo(video, performance.now());

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 감지된 얼굴의 수
        const faceCount = results.faceLandmarks ? results.faceLandmarks.length : 0;

        // 얼굴 랜드마크 그리기
        if (results.faceLandmarks) {
            results.faceLandmarks.forEach((landmarks) => {
                drawLandmarks(ctx, landmarks);
            });
        }

        // 얼굴 수 표시
        ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
        ctx.font = '20px Arial';
        ctx.fillText(`Faces detected: ${faceCount}`, 10, 30);

        requestAnimationFrame(processFrame);
    };

    processFrame();
}

function drawLandmarks(ctx, landmarks) {
    ctx.fillStyle = 'red';
    landmarks.forEach((landmark) => {
        const x = landmark.x * ctx.canvas.width;
        const y = landmark.y * ctx.canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
    });
}

export default main;
