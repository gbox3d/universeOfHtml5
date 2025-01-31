const oneTwoThree = [1, 2, 3];
let result = oneTwoThree.map((v) => {
  console.log(v);
  return v;
});

console.log(result) //[1, 2, 3]
console.log(result === oneTwoThree) //false


result = oneTwoThree.map((v)=> {
  return v+1
})

console.log(result) //2,3,4

result = oneTwoThree.map((v)=> {
  if(v%2) return '짝수'
  else {
    return '홀수'
  }

})

console.log(result) //[ '짝수', '홀수', '짝수' ]

result = oneTwoThree.map( (v,index)=> {
  console.log(v,index)
} );

console.log(result); //map은 값을 리턴하지않으면 그부분을 undefined 값을 넣는다. 요소의 객수를 줄이고 싶으면 reduce 나 filter를 사용해야한다.
