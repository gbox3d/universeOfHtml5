/**
 * Created by gbox3d on 2016. 8. 13..
 */

//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp

//let result = "baud = 1921".match(new RegExp("\\s*(\\w+)\\s*=\\s*(\\w+)\\s*"))

let result = "baud = 1921".match(/\w+/g);

console.log(result);