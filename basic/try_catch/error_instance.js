/*
JavaScript에는 일반적인 Error 생성자 외에도 7개의 중요 오류 생성자가 존재합니다. 클라이언트측 예외에 대해서는 제어 흐름과 에러 처리를 참고하세요.

EvalError
전역 함수 eval()에서 발생하는 오류의 인스턴스를 생성합니다.
InternalError
JavaScript 엔진의 내부에서 오류가 발생했음을 나타내는 오류 인스턴스를 생성합니다.
RangeError
숫자 변수나 매개변수가 유효한 범위를 벗어났음을 나타내는 오류 인스턴스를 생성합니다.
ReferenceError
잘못된 참조를 했음을 나타내는 오류 인스턴스를 생성합니다.
SyntaxError
eval()이 코드를 분석하는 중 잘못된 구문을 만났음을 나타내는 오류 인스턴스를 생성합니다.
TypeError
변수나 매개변수가 유효한 자료형이 아님을 나타내는 오류 인스턴스를 생성합니다.
URIError
encodeURI()나 decodeURl() 함수에 부적절한 매개변수를 제공했을 때 발생하는 오류의 인스턴스를 생성합니다.

*/

try {
    console.log(navigator.userAgent) // 선언되지않은 변수에 대한 참조 시도 
} catch (error) {

    console.log(error)

    console.log( error.message )

    console.log( error.stack )

    // Error는 예외중의 하나 , 에러는 다시 7종중에 하나로 구분됨
    console.log(error instanceof Error) //예외중에 하나인 에러
    console.log(error instanceof ReferenceError)
    console.log(error instanceof URIError)
    
}