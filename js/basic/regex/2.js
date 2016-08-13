/**
 * Created by gbox3d on 2016. 8. 13..
 */

const fs = require("fs")


let data = fs.readFileSync("test.txt","utf-8");

console.log(data);


//let result = data.match(new RegExp("\\s*(\\w+)\\s*=\\s*(\\w+)\\s*"));
//let result = data.match(/\s*(\w+)\s*=\s*(\w+)\s*/,'g');
//let result = data.match(/\w+/g);
let result = data.match(/[^\n](\w+)\s*=\s*(\w+)[^\n]/g);


console.log(result);

result.map(function (evt,index,arr) {
    console.log('---------------------')
    console.log(evt);
    console.log(index);
    console.log(arr);

    console.log(evt.match(/(\w+)/g))

});

