//copy
"use strict"
let obja = {
    a:1,
    b:2,
    k : [12,3,4,5]
}

//객체 참조
let objb = obja

console.log('objb',objb)

objb.b=3
console.log('obja',obja)


//얕은 카피 (assign), 나열가능한 1단계의 변수들만 복재된다.
let objc = {}
Object.assign(objc,obja)

objc.b = 4
objc.k[0] = 1
console.log('-----------------')
console.log('obja',obja)
console.log('objc',objc)


//깊은 카피 
let objd = JSON.parse(JSON.stringify(objc))
objd.a = 7
objd.k[0] = 10
console.log('-----------------')
console.log('obja',obja)
console.log('objd',objd)

