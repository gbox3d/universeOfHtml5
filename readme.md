## nwjs 기반으로 html5 어플리케이션 개발하기

개발환경은 미티어 기반으로 설명함. 미티어관련정보 [https://docs.meteor.com/](https://docs.meteor.com/)

### nwjs 설치(디버깅 가능하게 만들기)

기본적인 바이너리는 디버깅창이 열리지 않는다. 개발용으로 사용하기 위해서는 디버깅용 바이너리를 설치해야한다.
빌드타입이 normal,sdk,nacl 3가지가 있는데 그중에 sdk를 선택하여 설치한다.



``` shell
meteor npm install nw --nwjs_build_type=sdk
```
또는 

``` shell
meteor npm install nw@0.28.0-sdk
```

### 실행하기

루트경로에 있는 package.json 파일의 main 항목에 실행 경로명을 정해준다

``` json
{
  "name": "universeofhtml5",
  "version": "1.0.0",
  "description": "",
  "main": "원하는 실행경로",
  "window":{
    "width": 640,
    "height":480,
    "toolbar":false,
    "frame" : true
  },
  "dependencies": {
    "nw": "^0.28.0-sdk"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "meteor npx nw --enable-logging=stderr .",
    "debug" : "meteor npx nw --remote-debugging-port=9222"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/gbox3d/universeOfHtml5.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/gbox3d/universeOfHtml5/issues"
  },
  "homepage": "https://github.com/gbox3d/universeOfHtml5#readme"
}
  
```

그리고 실행창에서 다음과 같이한다.
``` shell
meteor npx nw
```

package.json에서 스크립트 정의 한부분 사용해서 실행하려면 다음과 같이 한다.
 
``` shell
meteor npm start
```

### 원격디버깅

원격 디버깅포트 9222로 실행하기 위해서는 다음과 같이한다.
``` shell
meteor npx nw --remote-debugging-port=9222
```

원격디버기을 위해서는 웹브라우져에서 다음주소로 접속한다.

[http://localhost:9222](http://localhost:9222)

