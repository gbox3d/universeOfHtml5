export default async function setup({ API_BASE_URL }) {

    /*
           ERR_CHECKCODE_MISMATCH = 1
ERR_HEADER_RECEIVE = 2
ERR_IMG1_SIZE = 3
ERR_IMG1_DATA = 4
ERR_IMG2_SIZE = 5
ERR_IMG2_DATA = 6
ERR_FACE_DETECT = 7
ERR_UNKNOWN_CODE = 8
ERR_EXCEPTION = 9
ERR_TIMEOUT = 10
           */



    const errorTable = {
        1: 'Checkcode mismatch',
        2: 'Header receive error',
        3: 'Image1 size error',
        4: 'Image1 data error',
        5: 'Image2 size error',
        6: 'Image2 data error',
        7: 'Face detect error',
        8: 'Unknown error code',
        9: 'Exception error',
        10: 'Timeout error'
    }

    return {
        version: "1.0.0",
        // Public APIs
        hello: () => fetch(`${API_BASE_URL}/`, {
            method: "GET"
        }),
        ping: async ({ token }) => {
            const res = await fetch(`${API_BASE_URL}/facenet/ping`, {
                method: "GET",
                headers: {

                    Authorization: `Bearer ${token}`,

                }
            });

            // const _response = {
            //     success: false,
            // }
            if (!res.ok) {

                // let error = '';
                // switch (res.status) {
                //     case 401:
                //         error = 'Unauthorized!';
                //         break;
                //     case 500:
                //         error = 'FaceOnMe Server not ready!';
                //         break;
                //     default:
                //         error = ' Unknown Error!';
                // }

                // console.log(res);
                const error = await res.json();

                throw new Error(error.error);

                // _msg.innerHTML = 'Error!';
                // return;
            }
            else {
                const result = await res.json();
                if (result.success) {
                    // _response.success = true;
                    // _response.msg = 'Server Ok! Welcome : ' + result.username;

                    return result;
                }
                else {
                    // _response.error = 'Server Error!';
                    throw new Error('Server Error!');
                }
                // console.log('Ping:', result);
            }




        },
        imageToEmbeddings: async (blob) => {

            const formData = new FormData();
            formData.append("myfield", blob, "capture.jpg");

            const res = await fetch(`${API_BASE_URL}/facenet/imageToEmbedding`, {
                method: 'POST',
                // content-type headers are not needed, browser will set it automatically
                body: formData
            });

            if (!res.ok) {
                // const result = await res.json();
                throw new Error(`${res.status} - ${res.statusText}`);
            }

            const result = await res.json();

            if (!result.success) {
                if (result.error == 'complete')
                    result.message = errorTable[result.code];
            }

            return result;

        },
        faceAuth: async (embedding, username) => {

            // try {
            // 얼굴 인증
            const res = await fetch(`${API_BASE_URL}/facenet/faceAuth`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-username": username == '' ? username : null,
                },
                body: JSON.stringify({ embedding })
            });

            if (!res.ok) {
                // const result = await searchRes.json();
                const result = await res.json();
                // console.log(result);
                // throw new Error(result.error);
                return result;
            }

            const searchResult = await res.json();
            return searchResult;
        },
        getFaceFilename: async ({ token }) => {
            const res = await fetch(`${API_BASE_URL}/facenet/getFaceFilename`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                const result = await res.json();
                // console.log(result);
                throw new Error(result.error);
            }
            const result = await res.json();
            return result; // { status:0, filename, username } or { error:... }
        },
        getFaceEmbedding: async ({ token, username }) => {
            const res = await fetch(`${API_BASE_URL}/facenet/get_face_embedding`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "x-username": username
                }
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.error);
            }

            const result = await res.json();
            // console.log(result);
            return result;
        },
        downloadImage: async ({ token, filename }) => {
            const response = await fetch(`${API_BASE_URL}/facenet/download`, {
                method: 'GET',
                headers: {
                    "filename": filename,
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`서버 응답 오류: ${response.error}`);
            }

            // Blob 데이터를 가져온 후, 화면에 표시
            const blob = await response.blob();

            return blob; // 나중에 facecheck 할 때 사용
        },
        uploadImage: async ({ token, blob }) => {
            const formData = new FormData();
            formData.append("myfield", blob, "capture.jpg");

            const res = await fetch(`${API_BASE_URL}/facenet/upload`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.error);
            }

            const result = await res.json();
            return result;
        },
        faceEmbedding: async ({ token, blob, username }) => {

            const formData = new FormData();
            formData.append("myfield", blob, "capture.jpg");

            const res = await fetch(`${API_BASE_URL}/facenet/face_embedding`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'x-username': username
                },
                body: formData
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.error);
            }

            const result = await res.json();
            return result;
        },
        faceCompare: async function ({blob1, blob2, token}) {
            try {
                const formData = new FormData();
                // 서버는 'img1', 'img2' 필드명을 사용하므로 이에 맞춰서 append
                formData.append('img1', blob1, 'camera1.jpg');
                formData.append('img2', blob2, 'camera2.jpg');

                const response = await fetch(`${API_BASE_URL}/facenet/facecheck`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // **주의**: FormData 사용 시 Content-Type을 직접 설정하지 않는 게 안전
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`서버 응답 에러: ${response.status}`);
                }

                const result = await response.json();
                // result.success, result.similarity 등 처리
                // console.log('facecheck result:', result);
                
                return result;
            } catch (error) {
                console.error('facecheck error:', error);
                throw error;
            }
        }

    }
}