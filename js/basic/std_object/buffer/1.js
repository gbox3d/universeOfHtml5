/**
 * Created by gbox3d on 2014. 6. 12..
 */


var test = new Buffer([0x30,0x31,0x32]);

console.log(test);

console.log(test[1]);

//아스키코드를 문자로
console.log( String.fromCharCode(test[1]));

//문자열로 만들기
console.log( String(test) );