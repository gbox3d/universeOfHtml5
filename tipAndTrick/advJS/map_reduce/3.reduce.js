let testObj ={
    'a' : {
        t : 1
    } ,
    'b' : {
        t : 2
    } ,
    'c' : {
        t : 2
    }, 
    'd' : {
        t : 1
    } ,
    'e' : {
        t : 1
    } 
}

let keys = Object.keys(testObj)
console.log(keys)

//t :1 인것만 골라내서 배열로 만들기 
let _result = keys.reduce((acc,cur)=> {
    console.log(cur)

    if(testObj[cur].t == 1) {
        acc.push(testObj[cur])
    }

    return acc;

},[])

console.log(_result)
