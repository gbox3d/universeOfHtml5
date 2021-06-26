#!/usr/bin/env node

//'chmod 755 2.js' and './2.js' to excute
//
const readlineInterface = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


(new Promise( (resolve,reject)=> {

  console.log('step1')
  readlineInterface.on('line',(_)=> {
    resolve(_);
  })

} ))
  .then(_=> new Promise( (resolve,reject)=> {

    console.log('from step1 msg: ' , _)
    if(_ !== 'ok') reject('step2')
    else {
      setTimeout(()=> {
        console.log('step2')
        resolve();
      },500)

    }

  } ))
  .then(_=> new Promise( (resolve,reject)=> {

    setTimeout(()=> {
      console.log('step3')
      resolve('from step3');
    },500)

  } ))
  .then(_=> {
    console.log('comsole',_);
  })
  .catch((_)=> {
    console.log('error catched ',_)

  })
  .finally(()=>{
    process.exit()
  })

