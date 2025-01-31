
const readlineInterface = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var steps = [
  new Promise((resolve,reject)=> {
    setTimeout(()=>{
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

  }),
  new Promise((resolve,reject)=> {
    setTimeout(() => {
      resolve('step3')

    },1000)


  })
];

Promise.all(steps)
  .then(_=> {
    console.log(_)
  })
  .catch(_=> {
    console.log('err',_)
  })
  .finally(()=> {
    process.exit();
})
