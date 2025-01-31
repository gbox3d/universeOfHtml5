const tick = Date.now();
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}ms`);

log('start')

setTimeout(() => {
    log("time out1")
}, 0);

Promise.resolve().then(_=> { log("resolve1") })

log('code end')
