async function main() {

    console.log('ok')

    const myFace = document.getElementById("myFace");

    try {
        let myStream = await navigator.mediaDevices.getUserMedia(
            initialConstrains
        );

        myFace.srcObject = myStream;

        // myFace.srcObject = myStream;
        // if (!deviceId) {
        //     await getCameras();
        // }
    } catch (e) {
        console.log(e);
    }



}

export default main;