const oneTwoThree = [1, 2, 3];

result = oneTwoThree.reduce((acc, cur, i) => {
  console.log(acc, cur, i);
  return acc + cur;
},
  0 //acc 초기값
);
// 0 1 0
// 1 2 1
// 3 3 2
//result; // 6

console.log(result)

result = oneTwoThree.reduce((acc, cur, i) => {
  console.log(acc, cur, i);
  return acc + cur;
});

console.log(result)

result = oneTwoThree.reduce((acc, cur) => {
  if(cur %2) acc.push('홀수')
  else {
    acc.push('짝수')
  }

  return acc;
}, []);

console.log(result)


//filter
result = oneTwoThree.reduce((acc, cur) => {
  if(cur %2) acc.push(cur)

  return acc;
}, []);

console.log(result)


let seqs = [
  (resolve)=> {
    console.log('p1 start')
    setTimeout(resolve, 2000);

  },
  (resolve)=> {
    console.log('p2 start')
    setTimeout(resolve, 1500);

  },
  (resolve)=> {
    console.log('p3 start')
    setTimeout(resolve, 500);

  },
  (resolve)=> {
    console.log('complete')
    resolve()
  }

]

seqs.reduce((acc,cur)=> {
  return acc.then(() => {
    return new Promise((resolve, reject) => {
      cur(resolve,reject)
    });

  });

},Promise.resolve())