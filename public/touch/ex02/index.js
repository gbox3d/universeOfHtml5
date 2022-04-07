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

    let touchData = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        startTick: 0,
    };
    
    touchpad.addEventListener('touchstart', function (e) {
        e.preventDefault();

        // lastTick = Date.now();
        touchData.startX = e.touches[0].clientX;
        touchData.startY = e.touches[0].clientY;
        touchData.startTick = Date.now();

        addLog(`touchstart: ${touchData.startX.toFixed(2)}, ${touchData.startY.toFixed(2)}`);
        // addLog(`touchstart: ${lastTick}`);
        
    }, false);

    touchpad.addEventListener('touchend', function (e) {
        e.preventDefault();

        // let delta = (Date.now()) - lastTick;
        touchData.endX = e.changedTouches[0].clientX;
        touchData.endY = e.changedTouches[0].clientY;
        let delta = Date.now() - touchData.startTick;

        let nDistance = Math.sqrt(
            Math.pow(touchData.endX - touchData.startX, 2) + 
            Math.pow(touchData.endY - touchData.startY, 2)
        );

        let angle = Math.atan2(
            touchData.endY - touchData.startY,
            touchData.endX - touchData.startX
        );

        let degree = (angle * 180 / Math.PI) + 180;

        addLog(`touchend: ${delta.toFixed(2)} ms , ${nDistance.toFixed(2)}px , ${degree.toFixed(2)} rad`);

    }, false);
}

export default main;