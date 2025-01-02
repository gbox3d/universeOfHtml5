import express from 'express'
import dotenv from "dotenv"
import https from 'https'
import http from 'http'
import fs from 'fs'
// import SocketIO from "socket.io";
import { Server as SocketIO } from "socket.io";
// import SocketIO_version from "socket.io/package";

// console.log(SocketIO_version);
dotenv.config({ path: '.env' }); //환경 변수에 등록 
console.log(`run mode : ${process.env.NODE_ENV}`);

const app = express()

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

let baseServer;
if(process.env.SSL === 'True') {
  console.log(`SSL mode ${process.env.SSL}`);
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
    ca: fs.readFileSync(process.env.SSL_CA),
  };
  // https 서버를 만들고 실행시킵니다
  baseServer = https.createServer(options, app)

}
else {
  baseServer = http.createServer({}, app)
}

//socket io
const wsServer = new SocketIO(baseServer);

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

baseServer.listen(process.env.PORT, () => {
  console.log(`server run at : ${process.env.PORT}`)
  
  const protocol = process.env.SSL === 'True' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost'; // .env에 HOST 설정이 없는 경우 기본값은 'localhost'
  const port = process.env.PORT;

  console.log(`server running at: ${protocol}://${host}:${port}`);
});


