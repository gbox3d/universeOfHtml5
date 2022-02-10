
async function main() {

    console.log('ok')

    let deviceList = document.querySelector('ul');

    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices)

        devices.forEach(device => {
            console.log(device)
            const li = document.createElement('li');
            li.innerText = `${device.label} , ${device.deviceId} , ${device.kind}`;
            deviceList.appendChild(li);
        });


    } catch (e) {
        console.log(e);
    }
}

export default main;