/**
 * Created by gbox3d on 2016. 8. 13..
 */


var test = [1,2,6,7,3,8,9,10,4,5];

//5보다 큰수만 골라내기
let test2 = test.filter((v)=> {

    return v > 5;

});

console.log(test2);