
async function main() {

    const elmInfo = document.querySelector('#info');
    var joystick = nipplejs.create({
        zone: document.getElementById("joystick"),
        mode: "static",
        position: { left: "30%", top: "50%" },
        color: "green",
        size: 200,
        //restJoystick: { y: false }
    });

    joystick
        .on('start end', function (evt, data) {
            console.log('start end', data);
            //dump(evt.type);
            //debug(data);
            //elmInfo.querySelector('.x').innerText = data.position.x;
            //elmInfo.querySelector('.y').innerText = data.position.y;
            //elmInfo.querySelector('.angle').innerText = data.angle.degree;
            //elmInfo.querySelector('.distance').innerText = data.distance;
        })
        .on("move", function (evt, data) {
            console.log(data);
            elmInfo.querySelector('.x').innerText = data.position.x.toFixed(2);
            elmInfo.querySelector('.y').innerText = data.position.y.toFixed(2);
            elmInfo.querySelector('.angle').innerText = data.angle.degree.toFixed(2);
            elmInfo.querySelector('.distance').innerText = data.distance.toFixed(2);

            if (data.direction) {
                elmInfo.querySelector('.directionX').innerText = data.direction.x;
                elmInfo.querySelector('.directionY').innerText = data.direction.y;
                elmInfo.querySelector('.direction').innerText = data.direction.angle
            }
            else {
                elmInfo.querySelector('.directionX').innerText = '';
                elmInfo.querySelector('.directionY').innerText = '';
                elmInfo.querySelector('.direction').innerText = '';
            }

        })
        .on('dir:up plain:up dir:left plain:left dir:down ' +
            'plain:down dir:right plain:right',
            function (evt, data) {
                //dump(evt.type);
                console.log(data);
            }
        )
        .on('pressure', function (evt, data) {
            //debug({ pressure: data });
        });

}

export default main;