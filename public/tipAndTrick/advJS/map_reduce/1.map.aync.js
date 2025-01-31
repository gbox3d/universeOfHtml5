//map 에서 사용하는 콜백은 각자 비동기 처리되어 순서가 뒤죽박죽된다.
//모든 데이터가 처리되길 기다리는 처리는 가능하다. Promise.all 

const oneTwoThree = [1000, 500, 300];
(async () => {
    let result = await Promise.all(
        oneTwoThree.map(async (v, index) => {

            await new Promise(resolve => {
                setTimeout(resolve, v)
            })

            console.log(`complete ${v} / ${index}`) //순서가 보장되지않음 , 빠른 순서로 처리됨 

            return v
        })
    );

    console.log(result) //map의 모든 데이터가 처리되면 실행됨 
})();

console.log('do it');

/*
출력 결과 

do it
complete 300 / 2
complete 500 / 1
complete 1000 / 0
[ 1000, 500, 300 ]

*/