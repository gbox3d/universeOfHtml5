# 초연결시대를 위한  html5 예제


## 설치하기

**module**
```sh
npm install
```


**.env 파일**
```sh
PORT=3000 # port 번호
PORT=3000
SSL=False
#SSL_KEY= key 파일 경로
#SSL_CERT= cert 파일 경로
#SSL_CA= ca 파일 경로
```

## 실행하기

**개발환경**
```sh
npm run dev
```

**배포환경**
```sh
npm start
```

**pm2**
```sh
pm2 start npm --name uoh -- start

```