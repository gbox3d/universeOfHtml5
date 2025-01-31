async function main() {
    console.log('ok');

    let deviceList = document.querySelector('#deviceList');

    // 기존 리스트 초기화 (중복 추가 방지)
    deviceList.innerHTML = '';

    // 헤더 추가 (그리드로 표시)
    const headerLabels = ['종류', '장치 이름', 'Device ID'];
    const headerRow = document.createElement('div');
    headerRow.classList.add('device-header');

    headerLabels.forEach(label => {
        const headerItem = document.createElement('div');
        headerItem.innerHTML = `<strong>${label}</strong>`;
        headerItem.classList.add('device-item');
        headerRow.appendChild(headerItem);
    });

    deviceList.appendChild(headerRow);

    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices);

        devices.forEach(device => {
            console.log(device);

            const row = document.createElement('div');
            row.classList.add('device-row');

            const kind = document.createElement('div');
            kind.innerText = device.kind;
            kind.classList.add('device-item');

            const label = document.createElement('div');
            label.innerText = device.label || '알 수 없는 장치';
            label.classList.add('device-item');

            const id = document.createElement('div');
            id.innerText = device.deviceId;
            id.classList.add('device-item', 'device-id'); // 긴 텍스트 처리를 위해 추가 클래스 적용

            row.appendChild(kind);
            row.appendChild(label);
            row.appendChild(id);

            deviceList.appendChild(row);
        });

    } catch (e) {
        console.log(e);
    }
}

export default main;
