(function() {
  var test = [1,2,6,7,3,8,9,10,4,5];
  var _r = test.reduce((acc,data)=> {
    //data는 두번째 데이터 부터 온다.
    //console.log(data)
    return acc += data;

  })
  console.log(test);
  console.log(_r);
})()

function test2() {

  var test = [
    {key:'a',value : 1},
    {key:'b',value : 2},
    {key:'b',value : 3},
    {key:'c',value : 4},
    {key:'a',value : 5}
  ];

  var _r = test.reduce((acc,data)=> {
    //data는 두번째 데이터 부터 온다.
    //console.log(data)

    console.log('acc :' + acc);
    console.log('data :' + data);

    if(acc[data.key]) {
      acc[data.key].values.push(data.value)
    }
    else {
      acc[data.key] = {
        values : [data.value]
      };
    }
    return acc;
  },{})

  console.log(_r);

}

test2()


function test3() {
  var a= ["a","b","c","d","e","a","b","a","c","c","c"];
  var b = a.reduce((x,y)=>{
    console.log("x:", x);
    console.log("y:", y);
    x[y] = ++x[y]|| 1;
    return x;
  },{});
  console.log(b);

}

test3()