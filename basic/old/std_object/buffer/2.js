/**
 * Created by gbox3d on 2014. 6. 12..
 */

var test = new Buffer(1); //1바이트 확보

test[0] = 0;

test[0] = 256 + 13; //짤리기

console.log(test);