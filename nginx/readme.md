## nginx

### http server

port 22288 로 서비스 추가하기

web 폴더 경로는 /home/gbox3d/work/universeOfHtml5/public  로 하기

/etc/nginx/sites-available/ 에 ssl_22288 파일 만들기

```nginx
server {
    listen 22288;
    server_name localhost;

    root /home/gbox3d/work/universeOfHtml5/public;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    # 필요한 경우 추가 설정
    # 예: 큰 파일 업로드 허용
    client_max_body_size 20M;

    # 로그 설정
    access_log /var/log/nginx/http_22288_access.log;
    error_log /var/log/nginx/http_22288_error.log;
}
```

설정파일 활성화

```bash
# 심볼릭 링크 생성
# http_22288 파일을 /etc/nginx/sites-available/에 복사
cp /etc/nginx/sites-available/default /etc/nginx/sites-available/http_22288

sudo ln -s /etc/nginx/sites-available/http_22288 /etc/nginx/sites-enabled/http_22288

# 설정 테스트
sudo nginx -t

# 성공시 Nginx 재시작
sudo systemctl reload nginx
```

### https server
/etc/nginx/sites-available/ssl_22280 파일 만들기  

```nginx
server {
    listen 22280 ssl;
    server_name ailab.miso.center;

    ssl_certificate /home/gbox3d/work/ssl/_wildcard_.miso.center_2024080760CE6.all.crt.pem;
    ssl_certificate_key /home/gbox3d/work/ssl/_wildcard_.miso.center_2024080760CE6.key.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    root /home/gbox3d/work/web_pub;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

설정파일 활성화

```bash
sudo ln -s /etc/nginx/sites-available/ssl_22280 /etc/nginx/sites-enabled/ssl_22280

#테스트
sudo nginx -t
#재시작
sudo systemctl reload nginx

```
