/**
 * Created by gunpower on 2016. 2. 4..
 */

var remote = {
    address : '192.168.9.2',
    port : 1471
}


var dgram = require( "dgram" );

var udp_socket = dgram.createSocket( "udp4" );

setInterval(function() {
    console.log('pung');
    udp_socket.send( Buffer('hi'), 0,2, remote.port ,remote.address); // added missing bracket
},1000)

//var remote_client;
/*

 udp 는 리스하는 과정이 없다. 연결시작 종료 개념이 없이 바로 데이터 보내고 받는식이다.

 open , close 개념이 없다.

 * */

/*
udp_socket.on( "message", function( msg, rinfo ) {

    console.log( rinfo.address + ':' + rinfo.port + ' - ' + msg );

    //remote_client = rinfo;

    udp_socket.send( Buffer([0x02,0x03]), 0,2, rinfo.port, rinfo.address ); // added missing bracket
});
udp_socket.bind( port );
    */