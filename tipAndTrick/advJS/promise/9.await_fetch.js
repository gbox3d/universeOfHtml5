const fetch = require('node-fetch');


(async () => {
    let _res = await (await fetch(`http://localhost:8080/hello?name=gbox`)).json()

    console.log(_res)

    _res = await (await fetch(`http://localhost:8080/getTime`)).json()
    console.log(_res)

})()
