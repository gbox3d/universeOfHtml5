import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';


export default async (video, canvas,threshold=20) => {

    let faceLandmarker;
    let ctx;
    let lookAtOrigin = { x: 0, y: 0 };

   

    if (canvas) {
        ctx = canvas.getContext("2d");
    }

    let intersectionPoint = { x: 0, y: 0, z: 0 };

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
        numFaces: 5,  // 한 명만 추적
    });

    let lastResults = null;

    const processFrame = async () => {

        const results = await faceLandmarker.detectForVideo(video, performance.now());
        lastResults = results;

        try {
            if (results.faceLandmarks && results.faceLandmarks.length > 0) {
                if (results.facialTransformationMatrixes.length > 0) {
                    const matrix = results.facialTransformationMatrixes[0];
                    const m = matrix.data; // 4x4 행렬

                    // ✅ 변환 행렬을 통해 카메라에서 본 얼굴의 위치 계산
                    const position = { x: m[12], y: m[13], z: m[14] };

                    // ✅ 정면 벡터 계산
                    const forwardVector = { x: m[8], y: m[9], z: m[10] };

                    // ✅ 시선이 닿는 위치(레이 트레이싱된 평면과의 충돌 지점) 계산
                    intersectionPoint = calculateRayPlaneIntersection(position, forwardVector);


                }
            }
        } catch (error) {
            console.error(error);
        }
        requestAnimationFrame(processFrame);
    };

    // 📌 평면과 광선의 충돌 좌표 계산 함수
    function calculateRayPlaneIntersection(rayOrigin, rayDirection) {
        // Z=-1 평면을 기준으로 충돌 지점 찾기
        const planeZ = 0;
        const t = (planeZ - rayOrigin.z) / rayDirection.z;
        return {
            x: rayOrigin.x + t * rayDirection.x,
            y: rayOrigin.y + t * rayDirection.y,
            z: planeZ
        };
    }

    // 📌 `video`의 로드 완료를 보장하는 Promise 기반 함수
    function videoLoaded(videoElement) {
        return new Promise((resolve, reject) => {
            if (videoElement.readyState >= 2) {
                resolve(); // 이미 로드된 경우 즉시 해결

            } else {
                videoElement.addEventListener("loadeddata", () => resolve(), { once: true });
                videoElement.addEventListener("error", () => reject("❌ Video failed to load."), { once: true });
            }
        });
    }


    const _getGazeDistance = () => {
        return Math.sqrt((lookAtOrigin.x - intersectionPoint.x) ** 2 + (lookAtOrigin.y - intersectionPoint.y) ** 2);
    }

    const _getFocusPercentage = () => {
        const distance = _getGazeDistance();
        return Math.max(0, 100 * (1 - distance / threshold));
    };

    const _getFaceStatus = () => {
        
        const results = lastResults;
    
        if (!results.faceLandmarks || results.faceLandmarks.length === 0) {
            return { faceok: false, eyeclose: false, mouthclose: true, oneface: false }; // 얼굴 없음
        }
    
        const faceok = results.faceLandmarks.length > 0;
        const oneface = results.faceLandmarks.length === 1;
    
        if (!oneface) {
            return { faceok, eyeclose: false, mouthclose: true, oneface }; // 얼굴이 2개 이상이면 별도 처리
        }
    
        const landmarks = results.faceLandmarks[0];
    
        // ✅ 눈 랜드마크 좌표
        const leftUpper = landmarks[159];
        const leftLower = landmarks[145];
        const rightUpper = landmarks[386];
        const rightLower = landmarks[374];
    
        // ✅ 입 랜드마크 좌표
        const upperLip = landmarks[13];
        const lowerLip = landmarks[14];
    
        // 두 점 사이 거리 계산 함수
        const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    
        // ✅ 눈꺼풀 간 거리 계산
        const leftEyeRatio = distance(leftUpper, leftLower);
        const rightEyeRatio = distance(rightUpper, rightLower);
        const eyeAspectRatio = (leftEyeRatio + rightEyeRatio) / 2;
    
        // ✅ 입 벌림 정도 계산
        const mouthAspectRatio = distance(upperLip, lowerLip);
    
        // ✅ 기준값 설정
        const EYE_CLOSED_THRESHOLD = 0.015; // 눈 감김 기준
        const MOUTH_OPEN_THRESHOLD = 0.04;  // 입 벌림 기준
    
        // ✅ 감지 결과
        const eyeclose = eyeAspectRatio < EYE_CLOSED_THRESHOLD;
        const mouthclose = mouthAspectRatio < MOUTH_OPEN_THRESHOLD; // 입이 닫혀 있는 상태

        const eyeclose2 = {
            left : leftEyeRatio < EYE_CLOSED_THRESHOLD,
            right : rightEyeRatio < EYE_CLOSED_THRESHOLD
        }
    
        return { faceok, eyeclose, mouthclose, oneface ,eyeclose2 };
    };
    

    return {
        start: async (hidepreview = false) => {

            try {

                //모바일의 경우 비디오를 숨기면 보안정책위배 되므로 켜두어야한다.
                if (hidepreview) {
                    video.style.display = "none";
                }

                // 📌 웹캠 접근 시도
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;

                // 📌 프로미스를 사용하여 `video`가 완전히 로드될 때까지 대기
                await videoLoaded(video);

                if (canvas) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                }

                console.log("📌 Webcam successfully loaded.");
                processFrame(); // 시선 추적 처리 시작

                return {
                    success: true,
                    videoWidth: video.videoWidth,
                    videoHeight: video.videoHeight
                }

            } catch (error) {
                console.error("❌ Error accessing webcam:", error);

                return {
                    success: false,
                    error: error
                }
            }
        },
        updateLookAtOrigin: () => {
            lookAtOrigin.x = intersectionPoint.x;
            lookAtOrigin.y = intersectionPoint.y;
        },
        // getInterSectionPoint: () => {
        //     return intersectionPoint;
        // },
        getLookAtOrigin: () => lookAtOrigin,
        getLookAtPoint: () => intersectionPoint,
        getGazeDistance: () => _getGazeDistance(),
        getFocusPercentage: () => _getFocusPercentage(),
        getFaceStatus : ()=> _getFaceStatus(),
        // 📌 캔버스에 십자선 및 시점 정보 표시 (좌표계 변환 적용)
        drawCanvas: () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // ✅ 캔버스 좌표 변환을 위한 중앙점 기준 설정
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const scaleFactor = 3; // 좌표 확대 비율

            // 📌 캔버스 좌표계 변환 (중앙을 (0,0)으로 설정)
            const gazeX = centerX - intersectionPoint.x * scaleFactor;
            const gazeY = centerY - intersectionPoint.y * scaleFactor; // Y축 반전 (캔버스는 아래로 +, 우리가 원하는 것은 위로 +)

            // lookAtOrigin 좌표계 변환
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;

            const lookAtX = centerX - lookAtOrigin.x * scaleFactor;
            const lookAtY = centerY - lookAtOrigin.y * scaleFactor;
            ctx.beginPath();
            ctx.moveTo(lookAtX - 10, lookAtY);
            ctx.lineTo(lookAtX + 10, lookAtY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(lookAtX, lookAtY - 10);
            ctx.lineTo(lookAtX, lookAtY + 10);
            ctx.stroke();

            // 📌 시선 추적 좌표를 캔버스에 표시
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(gazeX, gazeY, 5, 0, Math.PI * 2);
            ctx.fill();

            // 📌 텍스트 정보 표시
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.fillText(`Gaze: (${intersectionPoint.x.toFixed(2)}, ${intersectionPoint.y.toFixed(2)}) , ${_getGazeDistance().toFixed(2)}`, gazeX + 10, gazeY);
        }
    }

}