/**
 * Created by gbox3d on 2014. 3. 23..
 */

define( function () { // 의존 모듈들은 순서대로 매개변수에 담긴다.

    // 의존 모듈들이 모두 로딩 완료되면 이 함수를 실행한다.
    // 초기화 영역
    var i = 0;

    function increase() {
        i++;
    }

    function get() {
        return i;
    }

    // 외부에 노출할 함수들만 반환한다.
    return {
        increase: increase,
        get: get
    };


});