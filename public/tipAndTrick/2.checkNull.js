let testCheck = {
  header: {
    major: 100,
    minor: 20
  },
  callback : _=>console.log(_)
};

/*
js 구조체의 무결성을 순차적으로 검사해주는 방법
왼쪽부터 체크되므로 undefined가 나오면 멈추기 때문에 예외상황이 발생하지않는다.
좌측부터 써내려가지않고 만약 거꾸로 쓴다면 예외가 발생한다.

예> testCheck.headers.minor && testCheck && testCheck.headers
*/

testCheck && console.log('testCheck ok')
testCheck && testCheck.header && console.log('testCheck.header ok')

testCheck && testCheck.headers && testCheck.headers.minor && console.log('testCheck.header ok')

if(testCheck && testCheck.headers && testCheck.headers.minor ) {

}
else {
  console.log('testCheck.headers undefined');
}

/*
함수가 undefined 인지 검사 하여 호출여부를 결정한다.
 */
testCheck.callback && testCheck.callback('back')
testCheck.callfront && testCheck.callfront('front')

//널값일경우 {} 로 대신할경우
let some
let test = some || {}

console.log(test)