/**
 * Created by gbox3d on 2014. 3. 23..
 */


requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

require([
    'app/foo'
], function (foo) {

    console.log(foo.get()); // 0
    foo.increase();
    console.log(foo.get()); // 1


});

require(['app/test'], function(obj){

    console.log(obj);

    //이름 적용 시키기
    require(['myModule'],function(_obj) {
        console.log(_obj);

        //이때부터 이름으로 모듈에 접근할수 있다.
        console.log(require('myModule'));

    });

});