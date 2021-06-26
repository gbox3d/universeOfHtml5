
//https://joshua1988.github.io/web-development/javascript/js-async-await/

function test1(delay, msg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`start : ${msg}`)
            resolve(msg)
        }, delay)
    })
}

// console.log('start')
// test1(5000,'resolve1').then(_=>(console.log(_)))
// test1(2000,'resolve2').then(_=>(console.log(_)))


async function syncTest() {

    
    let result = await test1(1000, 'test1')
    
    //기다렸다가 지나간다.
    console.log('await after :', result)

    result = await test1(500, 'test2')
    console.log('await after :', result)

    return Promise.resolve()

}

(async () => {
    console.log('------------start-------------')
    await syncTest() //resolve가 반환 될때까지 기다린다.
    console.log('------------end---------------')

    console.log('sleep 3sec  start')
    await new Promise((resolve,reject)=> {
        setTimeout(()=> {
            resolve()
        },3000)
    }) 

    console.log('sleep end')

})();