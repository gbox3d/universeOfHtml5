async function main() {
    const touchpad = document.getElementById('touchpad');
    const log = document.getElementById('log');

    function addLog(msg) {
        let p = document.createElement('li');
        p.innerHTML = msg;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
        console.log(log.scrollHeight)
    }

    touchpad.addEventListener('touchstart', function (e) {
        e.preventDefault();
        //var log = document.getElementById('log');
        //log.innerHTML = 'touchstart';
        addLog('touchstart');
    }, false);

    touchpad.addEventListener('touchend', function (e) {
        e.preventDefault();
        //var log = document.getElementById('log');
        //log.innerHTML = 'touchend';
        addLog('touchend');
    }, false);

    touchpad.addEventListener('touchmove', function (e) {
        e.preventDefault();
        addLog(`touchmove: ${e.touches[0].clientX}, ${e.touches[0].clientY}`);
    }, false);
}

export default main;