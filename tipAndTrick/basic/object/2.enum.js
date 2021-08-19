"use strict"

const _obj={
    a:1,
    b:2,
    c:3
}

//키값만 루핑 
for(let key in _obj) {
    console.log(key)
}

//키값과 데이터값 모두 루핑 
for(let [key,val] of Object.entries(_obj)) {
    console.log(`${key},${val}`)
}

Object.entries(_obj).forEach(([key,val])=> {

    console.log(`${key},${val}`)

})

// for( let [a1,a2,a3] of [[1,2,3],[4,5,6]] )
// {
//     console.log(a1,a2,a3)
// }

