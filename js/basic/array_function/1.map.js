/**
 * Created by gbox3d on 2016. 8. 13..
 */


var test = [1,2,6,7,3,8,9,10,4,5];


var test2 = test.map((v,index) => {

    //console.log(index + ':' + v );

    return {value : v,key : index + ':' + v}

});

console.log(test)
console.log(test2);
