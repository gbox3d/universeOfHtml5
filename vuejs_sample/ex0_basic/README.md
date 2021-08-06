# ex0_basic

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

###

**data()**  
data() 함수에 오브잭트를 반환 해서 변수 선언하고  
{{}} 안에 변수 이름을 써서 탬플릿안에서 사용할수 있다.
```
<h1>{{msg}}</h1>

...

data() {
    return {
        msg : 'hi'
            //변수 선언
    }
}
```

**v-model**  
이와 같이 선언된 변수는 v-model을 사용하여 ui 입력을 과 동기화 시킬수있다.

```html
<input type="text" v-model="animal" />
```

**v-html**  
html 태그를 직접 넣어줄수있다.

**v-bind**  
태그의 속성값에 data에서 선언된 변수를 사용하고 싶을 때 사용한다.  
: 만 써서 v-bind는 생략가능하다.  

```html
<img  v-bind:src="placeimg"/>
<h2 :class="animal" >hello {{animal}}</h2> 

```
여기서 사용된 placeimg는 data에서 선엉되었다.
```js
data() {
    return {
        animal : 'cat',
        placeimg : 'https://placeimg.com/640/480/tech'
    }
}
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
