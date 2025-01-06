import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';



let faceLandmarker;
let webcamRunning = false;
const video = document.getElementById('webcam');
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');


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

        if (results.faceLandmarks) {
            results.faceLandmarks.forEach((landmarks) => {
                // drawFaceLandmarks(landmarks);
                drawIris(landmarks);
            });
        }

        requestAnimationFrame(processFrame);
    };

    

    const drawIris = (landmarks) => {
        
        // 오른쪽 눈의 홍채
        drawIrisLandmarks(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS);

        // 왼쪽 눈의 홍채
        drawIrisLandmarks(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS);
    };

    const drawIrisLandmarks = (landmarks, indices) => {
        ctx.strokeStyle = 'blue'; // 홍채 라인 색상
        ctx.lineWidth = 2;
        ctx.beginPath();
    
        let centerX = 0;
        let centerY = 0;
    
        indices.forEach((connection) => {
            const start = landmarks[connection.start];
            const end = landmarks[connection.end];
    
            // 시작 점
            const startX = start.x * canvas.width;
            const startY = start.y * canvas.height;
    
            // 끝 점
            const endX = end.x * canvas.width;
            const endY = end.y * canvas.height;
    
            // 라인 그리기
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
    
            // 중심 계산
            centerX += startX + endX;
            centerY += startY + endY;
        });
    
        // 평균값으로 중심 계산 (각 연결당 두 개의 좌표를 더했으므로 나눌 때는 2 * indices.length)
        centerX /= indices.length * 2;
        centerY /= indices.length * 2;
    
        ctx.closePath();
        ctx.stroke();
    
        // 중심에 빨간색 십자 표시
        drawCross(centerX, centerY);
    };
    
    const drawCross = (x, y) => {
        ctx.strokeStyle = 'red'; // 십자 색상
        ctx.lineWidth = 2;
    
        // 십자 그리기
        const size = 10; // 십자의 크기
        ctx.beginPath();
        ctx.moveTo(x - size, y); // 가로선 왼쪽 끝
        ctx.lineTo(x + size, y); // 가로선 오른쪽 끝
        ctx.moveTo(x, y - size); // 세로선 위쪽 끝
        ctx.lineTo(x, y + size); // 세로선 아래쪽 끝
        ctx.stroke();
    };

}
export default main;