'use strict';


// console.log('rev. 4')


const pcConfig = {
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
};

/////////////////////////////////////////////

globalThis.theApp = {
    version : '1.0.1',
    room: '',
    socket: null
}

console.log(theApp.version);

// var localStream;
// var pc;
// var remoteStream;


// Could prompt for room name:
// room = prompt('Enter room name:');

async function startConnect() {
    var room = 'foo';
    var socket = io.connect();

    let pc;
    let localStream;
    let remoteStream;

    theApp.room = room;
    theApp.socket = socket;

    if (room !== '') {
        socket.emit('join_room', room);
        console.log('Attempted to create or  join room', room);
    }

    //////////////////////////////////
    //소켓 이벤트 처리 
    socket.on('created', function (room) {
        console.log('Created room ' + room);
        // isInitiator = true;
    });
    socket.on('join', function (room) {
        console.log('Another peer made a request to join room ' + room);
        theApp.callBtn.hidden = false; //버튼 보이게 하기
    });

    socket.on('full', function (room) {
        console.log('Room ' + room + ' is full');
    });

    socket.on("offer", async (offer) => {
        msgTxt.innerText = 'Received offer from peer';
        console.log("received the offer");
        pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);
        socket.emit("answer", answer, theApp.room);
        console.log("sent the answer");
    });

    socket.on("answer", (answer) => {
        msgTxt.innerText = 'Received answer from peer';
        console.log("received the answer");
        pc.setRemoteDescription(answer);
    });

    socket.on("ice", (ice) => {
        msgTxt.innerText = `Received ICE candidate from peer ${ice.candidate}`;
        //연결 성공
        console.log(">>>> received candidate from peer ok <<<<",ice.candidate);
        pc.addIceCandidate(ice);
    });

    //start video 
    const initialConstrains = {
        audio: true,
        video: { facingMode: "user" },
    };

    //peer connection 생성
    try {
        //로컬 카메라 셋팅
        let stream = await navigator.mediaDevices.getUserMedia(
            initialConstrains
        );

        console.log('Adding local stream.');
        localStream = stream;
        localVideo.srcObject = stream;

        pc = new RTCPeerConnection(pcConfig);
        theApp.pc = pc;

        pc.onicecandidate = function (event) {
            console.log('icecandidate event: ', event);
            if (event.candidate) {
                // theApp.socket.emit('message', {
                //     type: 'candidate',
                //     label: event.candidate.sdpMLineIndex,
                //     id: event.candidate.sdpMid,
                //     candidate: event.candidate.candidate
                // });

                socket.emit("ice", event.candidate, theApp.room);


            } else {
                console.log('End of candidates.');
            }
        };

        pc.onaddstream = function (event) {
            //원격스트림 붙이기
            console.log('Remote stream added.');
            remoteStream = event.stream;
            remoteVideo.srcObject = remoteStream;

            // remoteVideo.classList.add("remoteVideoInChatting");
            // localVideo.classList.add("localVideoInChatting");
        };

        pc.onremovestream = function (event) {
            console.log('Remote stream removed. Event: ', event);
        }

        //로컬스트림 붙이기 
        localStream
            .getTracks()
            .forEach((track) => pc.addTrack(track, localStream));

        // pc.addStream(localStream);

    } catch (e) {
        console.log(e);
    }

}


function main() {

    theApp.startBtn = document.querySelector('#start')
    theApp.callBtn = document.querySelector('#call')
    theApp.msgTxt = document.querySelector('#msgTxt')
    theApp.versionTxt = document.querySelector('#versionTxt')

    theApp.localVideo = document.querySelector('#localVideo');
    theApp.remoteVideo = document.querySelector('#remoteVideo');

    theApp.versionTxt.innerText = theApp.version;

    theApp.callBtn.hidden = true;

    theApp.startBtn.addEventListener('click', function (evt) {
        startConnect()
        theApp.startBtn.hidden = true;
    });

    theApp.callBtn.addEventListener('click', async function (evt) {
        console.log('Sending offer to peer');
        msgTxt.innerText = 'Sending offer to peer';

        theApp.callBtn.hidden = true;
        try {
            const offer = await theApp.pc.createOffer();
            theApp.pc.setLocalDescription(offer);
            console.log("sent the offer");
            // theApp.socket.emit('message', offer);
            theApp.socket.emit('offer', offer,theApp.room);
            // socket.emit("offer", offer, roomName);
        }
        catch (e) {
            console.log('createOffer() error: ', e);
        }
    });
}

export default main;



// if (location.hostname !== 'localhost') {
//   requestTurn(
//     'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
//   );
// }

/////////////////////////////////////////////////////////
