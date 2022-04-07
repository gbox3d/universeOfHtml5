import * as THREE from 'three';
import WEBGL from 'WebGL';
// import {nipplejs} from 'nipplejs';
//<script src="https://cdn.jsdelivr.net/npm/nipplejs@0.9.1/dist/nipplejs.min.js"></script>
async function main() {

    const joystick = nipplejs.create({
        zone: document.getElementById('joystick'),
        mode: 'static',
        position: {
            left: '50%',
            top: '50%'
        }
    });

    joystick.on('start end', function (evt, data) {
        console.log(data);
        // dump(evt.type);
        // debug(data);
    }).on('move', function (evt, data) {
        // debug(data);
        console.log(data);
    }).on('dir:up plain:up dir:left plain:left dir:down ' +
        'plain:down dir:right plain:right',
        // function (evt, data) {
        //     dump(evt.type);
        // }
    ).on('pressure', function (evt, data) {
        // debug({pressure: data});
    });

    




}



export default main;