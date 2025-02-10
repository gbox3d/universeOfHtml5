
const myFaceVideo = document.getElementById("myFace");
const myCanvas = document.getElementById("myCanvas");

export default async ()=> {

    const constraints = {
        audio: false,
        video: true
    };


    const ctx = myCanvas.getContext('2d');
    
    const processFrame = async (canvas) => {
        

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(myFaceVideo, 0, 0, canvas.width, canvas.height);

        //image processing here

        requestAnimationFrame(processFrame.bind(null, canvas));
    };

    try {
        let _webCamStream = await navigator.mediaDevices.getUserMedia(constraints);
        myFaceVideo.srcObject = _webCamStream;
        
        //myFaceVideo.play(); //auto play 옵션을 안주었다면 이라인 주석 해제

        myFaceVideo.addEventListener('loadeddata', () => {
            
            console.log("카메라 연결 성공");

            myCanvas.width = myFaceVideo.videoWidth;
            myCanvas.height = myFaceVideo.videoHeight;
            
            processFrame(myCanvas);
        });

    } catch (e) {
        console.error("카메라 연결 실패:", e);
    }

}