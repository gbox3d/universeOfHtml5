const socket = io();

let roomName
let myStream;

let myPeerConnection

let myFace


socket.on("welcome", async () => {
    console.log('welcome');

    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log("sent the offer");
    socket.emit("offer", offer, roomName);

});

socket.on("offer", async (offer) => {

    console.log("received the offer");
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit("answer", answer, roomName);
    console.log("sent the answer");
});

socket.on("answer", (answer) => {
    console.log("received the answer");
    myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
    console.log("received candidate");
    myPeerConnection.addIceCandidate(ice);
});

// socket.on("")

async function main() {
    const welcome = document.querySelector("#wellcome");
    const welcomeForm = welcome.querySelector("form");
    myFace = document.getElementById("myFace");
    
    //방에 입장하기
    welcomeForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        //make connection
        myPeerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302",
                        "stun:stun3.l.google.com:19302",
                        "stun:stun4.l.google.com:19302",
                    ],
                },
            ],
        });
        myPeerConnection.addEventListener("icecandidate", (data) => {
            console.log("sent candidate");
            if(data.candidate) {
                socket.emit("ice", data.candidate, roomName);

            }
            console.log(data)
        
        });
        myPeerConnection.addEventListener("addstream", (data) => {
            
            const peerFace = document.getElementById("peerFace");
            peerFace.srcObject = data.stream;

            console.log(data)

            console.log('addstream ok');
        });

        //emit enter room packet
        const input = welcomeForm.querySelector("input");

        socket.emit("join_room", input.value);
        roomName = input.value;
        input.value = "";

        welcome.hidden = true;

        //media setup
        const initialConstrains = {
            audio: true,
            video: { facingMode: "user" },
        };

        try {
            let myStream = await navigator.mediaDevices.getUserMedia(
                initialConstrains
            );
            myFace.srcObject = myStream;

            myStream
                .getTracks()
                .forEach((track) => myPeerConnection.addTrack(track, myStream));

            theApp.myStream = myStream;


        } catch (e) {
            console.log(e);
        }




    });



}

export default main;