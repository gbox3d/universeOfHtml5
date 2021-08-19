// import fetch from 'node-fetch
import fetch from "node-fetch"

let _buf = new Uint8Array( await (await (await fetch('https://avatars.githubusercontent.com/u/536420?s=400&v=4')).blob()).arrayBuffer()) 

console.log( _buf)