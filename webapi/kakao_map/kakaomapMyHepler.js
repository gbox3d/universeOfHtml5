function kakaoMapSetup({onReadyCallback,extra}) {




  fetch(`./key.json`)
    .then(o=>o.json())
    .then((o)=> {
      console.log(o)

      //<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 사용하세요&libraries=services"></script>

      let sdkUrl = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${o.key}&autoload=false`

      if(extra) {

        sdkUrl += extra

      }


      loadScript(sdkUrl,()=> {

        // console.log(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${o.key}&autoload=false`)

        daum.maps.load(function() {
          // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
          //var map = new daum.maps.Map(node, options);

          // var container = document.getElementById('map');

          // var options = {
          //   center: new daum.maps.LatLng(33.450701, 126.570667),
          //   level: 3
          // };
          //
          //
          // var map = new daum.maps.Map(container, options);

          onReadyCallback()

        });



      })


    })
    .catch(function (e) {
      console.log(e);

    })



  function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" ||
          script.readyState == "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  //Others
      script.onload = function(){
        callback();
      };
    }

    script.src = url;
    document.body.appendChild(script);
  }

}