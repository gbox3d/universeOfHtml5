## nwjs 기반으로 html5 어플리케이션 개발하기

### nwjs 설치(디버깅 가능하게 만들기)

기본적인 바이너리는 디버깅창이 열리지 않는다. 개발용으로 사용하기 위해서는 디버깅용 바이너리를 설치해야한다.
빌드타입이 normal,sdk,nacl 3가지가 있는데 그중에 sdk를 선택하여 설치한다.

``` shell
meteor npm install nw --nwjs_build_type=sdk
```
또는 

``` shell
meteor npm install nw@0.13.3-sdk
```

### 실행하기

루트경로에 있는 package.json 파일의 main 항목에 실행 경로명을 정해준다

``` json
{
  "name": "universeofhtml5",
  "version": "1.0.0",
  "description": "",
  "main": "원하는경로"
  
  
 }
  
```

그리고 실행창에서 다음과 같이한다.
``` shell
meteor npx nw
```


### 원격디버깅

원격 디버깅포트 9222로 실행하기 위해서는 다음과 같이한다.
``` shell
meteor npx nw --remote-debugging-port=9222
```

원격디버기을 위해서는 웹브라우져에서 다음주소로 접속한다.

[http://localhost:9222](http://localhost:9222)

