
const fileInput = document.getElementById('file-input');
const progressBar = document.getElementById('progress-bar');
const info_text = document.getElementById('info-text');

var base_url = '';
const apiUrl = '/api/v1/uploader/chunk';
const fc_apiUrl = '/api/v1/fc';
var base_path = '';

const authInfo = document.querySelector('#auth-info');
const fileList = document.getElementById('file-list');
const folderSelector = document.getElementById('select-folder');

const myVideo = document.getElementById('myVideo');
const videoSource = myVideo.querySelector('source');

const authToken = localStorage.getItem('auth-token');


async function FolderCheck() {


    try {
        // cwd를 쿼리 파라미터로 인코딩하여 URL에 붙임
        const url = `${base_url}${fc_apiUrl}/filelist?cwd=`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': authToken
            },
        });

        const data = await response.json();
        // 예: { r: "ok", files: ["file1.txt", "file2.jpg", ...] }

        if (data.r == 'ok') {

            // 기존 폴더 목록 초기화, 첫번째 목록은 제외 하고 지우기

            while (folderSelector.options.length > 1) {
                folderSelector.remove(1);
            }


            data.entries.forEach(entry => {
                //folder 만 골라서 넣어주기
                if (entry.type == "directory") {
                    const option = document.createElement('option');
                    option.textContent = entry.name;
                    folderSelector.appendChild(option);
                }
            });
        }
        else {
            // 에러 메시지 출력
            info_text.innerHTML = `Error fetching file list `;
        }
    }
    catch (err) {
        console.error('Error fetching file list:', err);
    }



}

async function uploadFileInChunks(file, chunkSize = 1024 * 1024) {

    const totalSize = file.size;
    let uploadedBytes = 0;

    for (let start = 0; start < totalSize; start += chunkSize) {
        const chunk = file.slice(start, start + chunkSize);

        const url = `${base_url}${apiUrl}`;

        // fetch: 한 조각씩 업로드
        const res = await fetch(url, {
            method: 'POST',
            body: chunk,
            headers: {
                'Content-Type': 'application/octet-stream',  // 또는 file.type
                'upload-name': encodeURIComponent(file.name),
                'base-path': base_path != '' ? base_path : './',
                'file-size': totalSize,
                'chunk-start': start,
                'chunk-size': chunk.size,
                'auth-token': authToken
            },
        });

        const json = await res.json();
        console.log(json);

        uploadedBytes = start + chunk.size;
        const progress = Math.round((uploadedBytes / totalSize) * 100);
        progressBar.value = progress;
    }
}

async function updateFileList(cwd) {
    try {

        info_text.innerHTML = `Fetching file list from ${cwd}...`;


        // cwd를 쿼리 파라미터로 인코딩하여 URL에 붙임
        const url = `${base_url}${fc_apiUrl}/filelist?cwd=${encodeURIComponent(cwd)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': authToken
            },
        });

        const data = await response.json();
        // 예: { r: "ok", files: ["file1.txt", "file2.jpg", ...] }

        if (data.r == 'ok') {
            fileList.innerHTML = '';

            data.entries.forEach(entry => {

                // const _name = entry.name;
                const li = document.createElement('li');
                li.textContent = `${entry.name} (${entry.type}) - ${entry.size ? entry.size : "0"} bytes`;
                li.setAttribute('data-name', entry.name);
                li.setAttribute('data-type', entry.type);
                li.setAttribute('data-size', entry.size);
                li.setAttribute('data-created', entry.createdAt);

                fileList.appendChild(li);

            });

            info_text.innerHTML = `File list fetched from ${cwd}`;
        } else {
            // 에러 메시지 출력
            info_text.innerHTML = `Error fetching file list from ${cwd}`;
            console.error('Error fetching file list:', data);
        }
    } catch (err) {
        console.error('Error fetching file list:', err);
    }
}

async function main() {

    // 1) 로컬 스토리지에서 토큰 읽기 (예시 키명: "auth-token")
    let authToken = localStorage.getItem('auth-token');

    console.log('authToken:', authToken);

    if (!authToken) {
        authToken = prompt("Enter your auth token:");
        if (authToken) {
            localStorage.setItem('auth-token', authToken);
        } else {
            alert('No token provided');
            return; // 함수 종료

        }
        //refresh
        location.reload();
    }
    else {
        console.log('authToken:', authToken);
        authInfo.querySelector('.token-str').textContent = authToken;

        
    }

    //2) API base URL 읽기
    let apiBaseUrl = localStorage.getItem('api-base-url');

    if (!apiBaseUrl) {
        apiBaseUrl = prompt("Enter your API base URL:");
        if (apiBaseUrl) {
            localStorage.setItem('api-base-url', apiBaseUrl);
        } else {
            // alert('No API base URL provided');
            // return; // 함수 종료
        }
        location.reload();
    }
    else {
        console.log('apiBaseUrl:', apiBaseUrl);
        authInfo.querySelector('.api-base-url').textContent = apiBaseUrl;
    }

    base_url = apiBaseUrl;

    authInfo.querySelector('.reset-token').addEventListener('click', () => {

        localStorage.removeItem('auth-token');
        localStorage.removeItem('api-base-url');
        location.reload();
    });

    
    

    document.getElementById('upload-btn').onclick = async () => {
        const fileList = fileInput.files;
        if (!fileList.length) return; // 파일을 선택하지 않았다면 종료

        try {

            // 여러 파일을 순차적으로 업로드
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                console.log(`Start uploading file: ${file.name}`);

                info_text.innerHTML = `Uploading ${file.name}...`;

                // 각 파일마다 progressBar를 0으로 초기화F
                progressBar.value = 0;

                // 조각 업로드
                await uploadFileInChunks(file, 1 * 1024 * 1024); // 예: 1MB씩 업로드

            }

            // alert('All selected files have been uploaded!');
            info_text.innerHTML = 'All selected files have been uploaded!';

            // 파일 업로드 후 파일 목록을 업데이트
            updateFileList(base_path);

        } catch (err) {
            console.error(err);
            alert('An error occurred during upload');
        }
    };

    document.querySelector('#btn-delete').addEventListener('click', async () => {

        const selectedFiles = Array.from(fileList.querySelectorAll('.selected')).map(li => li.getAttribute('data-name'));

        // 파일이 선택되지 않았다면 중단
        if (!selectedFiles.length) {
            alert('No files selected!');
            return;
        }

        for (const filename of selectedFiles) {
            try {
                const bodyData = {
                    path: base_path,     // 실제 삭제할 폴더 경로
                    file: filename  // 삭제할 파일 이름
                };

                const url = `${base_url}${fc_apiUrl}/delete`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': authToken       // 필요하다면 추가
                    },
                    body: JSON.stringify(bodyData),
                });

                const result = await response.json();
                console.log('Delete API result:', result);

                if (result.r === 'ok') {

                    updateFileList(base_path);
                    FolderCheck();

                    info_text.innerHTML = `File ${filename} has been deleted`;

                } else {
                    // 서버에서 에러 반환 시
                    // alert(`Failed to delete: ${filename}\n${JSON.stringify(result)}`);
                    info_text.innerHTML = `Failed to delete: ${filename}\n${JSON.stringify(result)}`;
                }

            } catch (error) {
                console.error('Error while deleting file:', error);
                //   alert(`Error while deleting file: ${filename}\n${error}`);
                info_text.innerHTML = `Error while deleting file: ${filename}\n${error}`;
            }
        }

    });

    document.querySelector('#btn-download').addEventListener('click', async () => {
        const selectedFiles = Array.from(fileList.querySelectorAll('.selected')).map(li => li.getAttribute('data-name'));

        // 파일이 선택되지 않았다면 중단
        if (!selectedFiles.length) {
            alert('No files selected!');
            return;
        }

        // 선택된 파일들 반복 처리
        for (const fileName of selectedFiles) {


            try {
                const url = `${base_url}${fc_apiUrl}/read`;
                // 서버에 파일 다운로드 요청
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': authToken // 필요시 추가
                    },
                    body: JSON.stringify({
                        path: base_path, // 실제 파일이 저장된 경로
                        file: fileName,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Server returned ${response.status} : ${response.statusText}`);
                }

                // 2) Content-Length 추출 (파일 크기를 알 수 있다면)
                const contentLength = response.headers.get('Content-Length');
                if (!contentLength) {
                    console.warn('No Content-Length header, cannot compute download progress accurately.');
                }

                // 3) 스트리밍 읽기 준비
                const reader = response.body.getReader();
                const chunks = [];
                let receivedBytes = 0;

                // 4) <progress> 태그 참조
                const progressBar = document.getElementById('download-progress');
                progressBar.value = 0; // 초기화

                // 5) 스트리밍 루프
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        // 다운로드가 끝났으면 루프 종료
                        break;
                    }
                    chunks.push(value);
                    receivedBytes += value.length;

                    // 6) 진행률 계산
                    if (contentLength) {
                        const percent = (receivedBytes / contentLength) * 100;
                        progressBar.value = Math.floor(percent);
                    } else {
                        // Content-Length가 없다면, 단순히 바이트 누적만 표시 가능
                        // progressBar.value = ... (상대적 진행 불가)
                    }
                }

                // 응답을 Blob으로 받아서 브라우저에 다운로드 트리거
                // const blob = await response.blob();
                const blob = new Blob(chunks);

                // Blob URL 생성
                const downloadUrl = window.URL.createObjectURL(blob);

                // <a> 태그를 동적으로 만들어 클릭 → 다운로드
                const tempLink = document.createElement('a');
                tempLink.href = downloadUrl;
                tempLink.download = fileName; // 저장될 때의 기본 파일명
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);

                // Blob URL 해제
                window.URL.revokeObjectURL(downloadUrl);

                console.log(`File download triggered: ${fileName}`);

            } catch (err) {
                console.error('Download error:', err);
                alert(`Error downloading file "${fileName}":\n${err}`);
            }
        }

    });

    document.querySelector('#btn-create-folder').addEventListener('click', async () => {
        let folderName = document.querySelector('#input-folder').value;
        if (folderName.length == 0) {
            alert('Input folder name');
            return;
        }
        try {
            // /api/v2/mkdir API 호출
            const bodyData = {
                path: '',     // 실제 생성할 폴더 경로
                dir: folderName  // 생성할 폴더 이름
            };

            const response = await fetch(`${fc_apiUrl}/mkdir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken       // 필요하다면 추가
                },
                body: JSON.stringify(bodyData),
            });

            const result = await response.json();
            console.log('Create folder API result:', result);
            if (result.r == 'ok') {
                // alert('Folder created');
                info_text.innerHTML = `Folder ${folderName} has been created`;

                base_path = '';
                updateFileList(base_path);
                FolderCheck();
            }

        }
        catch (error) {
            console.error('Error while creating folder:', error);
            info_text.innerHTML = `Error while creating folder: ${folderName}\n${error}`;
        }
    });

    fileList.addEventListener('click', async (e) => {
        const target = e.target;
        if (target.tagName === 'LI') {

            // 기존 선택 초기화

            const selectedItems = fileList.querySelectorAll('.selected');
            selectedItems.forEach(item => item.classList.remove('selected'));


            // .selected 클래스 추가
            // target.classList.toggle('selected');
            target.classList.add('selected');

            // 파일명 추출
            // const fileName = target.textContent.trim();
            const fileName = target.getAttribute('data-name');



            //파일 확장자가 동영상인지 체크
            const fileType = target.getAttribute('data-type');
            if (fileType == "file") {
                console.log(`Selected file: ${fileName}`);
                const ext = fileName.split('.').pop();
                if (ext == "mp4" || ext == "avi" || ext == "mov" || ext == "mkv") {

                    // 동영상 재생 경로 설정
                    const newSrc = `http://ailab.miso.center:21030/uploads/${base_path}/${fileName}`;

                    // <source> 엘리먼트 src 업데이트
                    videoSource.src = newSrc;

                    // <video> 엘리먼트가 새 소스를 인식하도록 load() 호출
                    // myVideo.load();

                    // // 자동 재생을 원한다면 play() 호출
                    // myVideo.play().catch(err => {
                    //     // 자동 재생이 차단될 수 있으므로, 필요하면 예외 처리
                    //     console.log('Autoplay was prevented:', err);
                    // });

                    myVideo.load(); // 비동기적으로 로드

                    // 'canplay' 이벤트가 발생할 때까지 기다림
                    await new Promise(resolve => myVideo.addEventListener('canplay', resolve, { once: true }));

                    try {
                        await myVideo.play();
                        console.log("Video playback started.");
                    } catch (err) {
                        console.log("Autoplay was prevented:", err);
                        // 자동 재생이 차단되었을 때 UI에서 재생 버튼 표시 가능
                    }

                    myVideo.classList.remove('hidden');

                    
                }
                else {
                    // myVideo.style.display = 'none';
                    myVideo.classList.add('hidden');
                }
            }
            else {
                console.log(`Selected folder: ${fileName}`);
                myVideo.style.display = 'none';
            }
        }
    });

    folderSelector.addEventListener('change', async (e) => {
        const selectedFolder = e.target.value;
        base_path = selectedFolder;
        updateFileList(selectedFolder);
    });

    updateFileList(base_path);
    FolderCheck();

}

export default main;
