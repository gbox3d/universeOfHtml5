const readlineInterface = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var steps = [
  new Promise((resolve,reject)=> {
    setTimeout(_=> {
      resolve('step1')
    },3000)
  }),
  new Promise((resolve,reject)=> {

    readlineInterface.on('line',(_)=>{
      if(_ === 'ok') {
        resolve(_);
      }
      else {
        reject(_);
      }
    })

  })
];

//먼저 resolve 된것을 받는다.

Promise.race(steps)
.then(_=> {
  console.log('complete',_);
})
.catch(_=> {
  console.log('err',_);
})
.finally(_=> {
  process.exit();
});