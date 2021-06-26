
console.log('start');

(new Promise((resolve,reject)=>{
  let data = 100;
  setTimeout(()=> {
    console.log('resolve before')
    resolve(data);
    console.log('resolve after')
  },500)
} ) ).then(data=> {
  console.log(data);
})
  .finally(_=> {
    console.log('final')
  });



console.log('hello promise');