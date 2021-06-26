## nodejs
- 14.x 버전이후에 import를 사용할수있다.
- package.json에서 "type": "module" 을 추가 해주어야한다.  
```json
{
  "type": "module",
  "name": "uoh2",
  "version": "1.0.0",
  "description": "universe of html5 sample code version 2",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "http": "npx http-server"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "http-server": "^0.12.3",
    "node-fetch": "^2.6.0",
    "xml-js": "^1.6.11"
  }
}

```
그렇지 않으면 다음과 같은 에러가 발생한다.   
SyntaxError: Cannot use import statement outside a module

## browser
- script tag에서 type 속성을 module로 지정해주어야한다.
- 'use strict' 선언
```html
<script type="module">
  "use strict";
  import {foo,kaa,bar} from './foo.js'

</script>
```
