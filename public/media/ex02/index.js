
const myFaceCamera = document.getElementById("myFace");
const myCanvas = document.getElementById("myCanvas");

export default async ()=> {

    const constraints = {
        audio: false,
        video: true
    };


    const ctx = myCanvas.getContext('2d');
    
    const processFrame = async (canvas) => {
        

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(myFaceCamera, 0, 0, canvas.width, canvas.height);

        //image processing here

        requestAnimationFrame(processFrame.bind(null, canvas));
    };

    try {
        let myStream = await navigator.mediaDevices.getUserMedia(constraints);
        myFaceCamera.srcObject = myStream;
        console.log("카메라 연결 성공");

        
        myFaceCamera.addEventListener('loadeddata', () => {


            myCanvas.width = myFaceCamera.videoWidth;
            myCanvas.height = myFaceCamera.videoHeight;
            
            processFrame(myCanvas);
        });
    } catch (e) {
        console.error("카메라 연결 실패:", e);
    }

}