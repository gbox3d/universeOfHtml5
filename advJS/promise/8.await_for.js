function foo(delay) {

    return new Promise( (resolve,reject) => {

        setTimeout(()=> {
            // console.log(delay)
            return resolve(delay)
        },delay)
        
    })

}

async function forEachTest() {
    let test = [700,100,200,500,300]

    // test.forEach( async _=> {

    //     // console.log(_)
    //     let _res = await foo(_)

    //     console.log(_res)
    // })

    //동기식 처리를 위해서는 forEach 대신 for of 를 써야한다.
    for(_ of test) {
        let _res = await foo(_)
        console.log(_res)
    }

    console.log('finish')
}

forEachTest()