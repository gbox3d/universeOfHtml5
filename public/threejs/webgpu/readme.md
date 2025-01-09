## webgpu 모듈 임포트 설정

```html
<script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@latest/build/three.webgpu.min.js",
            "three/tsl": "https://cdn.jsdelivr.net/npm/three@latest/build/three.tsl.min.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/"
        }
    }
</script>
```

https://cdn.jsdelivr.net/npm/three@latest/build/three.webgpu.min.js 에서 three.js를 가져옵니다.  
아직 구현이 완료되지 않은 WebGPU를 사용하기 위해 three.webgpu.min.js를 사용합니다.  
이후에 통합되거나 WebGPU가 완성되면 기존의 three.js로 사용할 것으로 예상됩니다.  