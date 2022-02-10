import express from 'express'
import dotenv from "dotenv"
import https from 'https'
import fs from 'fs'
import SocketIO from "socket.io";
// import SocketIO_version from "socket.io/package";

// console.log(SocketIO_version);
dotenv.config({ path: '.env' }); //환경 변수에 등록 
console.log(`run mode : ${process.env.NODE_ENV}`);

const app = express()

// app.use('/api/v1',fileControl);
app.use('/tipAndTrick', express.static('./tipAndTrick'));
app.use('/media', express.static(`./media`));
app.use('/webrtc', express.static(`./webrtc`));
app.use('/', express.static(`./public`));

// console.log(__dirname)

//순서 주의 맨 마지막에 나온다.
app.all('*', (req, res) => {
  res
    .status(404)
    .send('oops! resource not found')
});

const options = {
  key: fs.readFileSync('/home/ubiqos/work/project/cert_files/2022_2/private.key'),
  cert: fs.readFileSync('/home/ubiqos/work/project/cert_files/2022_2/certificate.crt'),
  ca: fs.readFileSync('/home/ubiqos/work/project/cert_files/2022_2/ca_bundle.crt'),
};
// https 서버를 만들고 실행시킵니다
const httpsServer = https.createServer(options, app)

//socket io
const wsServer = SocketIO(httpsServer);

// console.log(SocketIO.Server.version)


wsServer.on("connection", (socket) => {

  const io = wsServer;

  console.log('connected', socket.id, socket.handshake.address);

  function countMembers(roomName) {
    
    // console.log(io.sockets.adapter.rooms.get(roomName).size)
    // let clientsInRoom = io.sockets.adapter.rooms[roomName];
    // console.log(clientsInRoom)
    // return clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;

    return io.sockets.adapter.rooms.get(roomName).size
  }

  socket.on("join_room", (roomName) => {
    
    socket.join(roomName);

    console.log('usercount : ', countMembers(roomName));

    if(countMembers(roomName) < 2) {
      console.log('create_room', roomName, socket.id);
      socket.emit('created', roomName, socket.id);
    }
    else {
      console.log('join_room', roomName, socket.id);
      socket.to(roomName).emit('join', roomName, socket.id);
    }
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    console.log("ice", ice)
    socket.to(roomName).emit("ice", ice);
  });

});

httpsServer.listen(process.env.PORT, () => {
  console.log(`server run at : ${process.env.PORT}`)
});


