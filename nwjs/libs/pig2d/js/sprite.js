/**
 * Created by gbox3d on 2013. 12. 19..
 */

Pig2d.SpriteModel.fixedCanvas = Pig2d.SpriteModel.extend({

    initialize: function(param) {

        this.attributes.data.canvas_size = param.canvas_size;

        if(this.attributes.data.canvas_size == undefined) {

            this.attributes.data.canvas_size = {
                width : 64,
                height: 64
            }

        }

        Pig2d.SpriteModel.prototype.initialize.call(this,param);

    },
    changeDress : function(param) {

        this.attributes.imgObj = param.texture;
        this.attributes.data = param.animation;

        var sheet = this.get('sheet');

        this.setFrame(this.attributes.currentFrame);

    },
    applyAnimation : function(delataTick) {

        if(this.attributes.AnimationStatus == 'play') {

            this.attributes.currentTick += delataTick;
            var frameindex =  this.attributes.currentFrame;
            var Ani_data = this.get('data');

            var delay = 300;
            if(frameindex >= 0) {
                delay = Ani_data.frames[frameindex].delay / 1000;
            }

            if(this.attributes.currentTick > delay) {

                //틱리셋
                this.attributes.currentTick = 0;

                if(frameindex < 0) { //공백프레임부터 시작했으면..
                    frameindex = this.attributes.startFrame;
                }
                else {
                    ++frameindex;
                }

                if(frameindex > this.attributes.endFrame) {//마지막 프레임이면

                    if(this.attributes.isAnimationLoop) {
                        frameindex = this.attributes.startFrame;
                        this.setFrame(frameindex);
                    }
                    else {
                        this.attributes.AnimationStatus = 'stop';
                        frameindex = this.attributes.endFrame;
                    }


                    if(this.attributes.AnimationEndCallback != undefined) {

                        this.attributes.AnimationEndCallback.bind(this)();

                    }

                }
                else {
                    this.setFrame(frameindex);
                }
            }
        }


    },

    destroy : function() {
        //슈퍼 클래싱
        Pig2d.SpriteModel.prototype.destroy.call(this);
    }


});

Pig2d.util.addSprite = function(param) {

    /*

     내부적인 종속 관계

     node -> node_control-> node_sprite

     node 는 실제 연결된 객체의 위치,회전,크기 변환시에 사용한다.

     node_control 에는 css 애니메이션 효과를 붙인다.

     node_sprite 에는 좌우 반전 또는 프레임애니메이션 효과를 제어 할때 사용한다.

     */

    var parent = param.parent;// || this.CameraNode;
    var prefeb = param.prefeb;// || this.current_select_prefeb;

    if(!prefeb) {
        alert('오브잭트 프리펩을 먼저 선택해주세요')
        return null;
    }

    var node = Pig2d.util.createDummy();
    node.type = 'sprite_dummy';
    if(param.name) {
        node.set('name',param.name);
    }

    /*
    //초기위치를 카메라 스케일에 맞추어 보정해준다.
    var cam_scale = this.CameraNode.get('model').getScale();

    node.get('model').setPosition(
        param.x * (1.0 / cam_scale.X) ,
        param.y * (1.0 / cam_scale.Y) );
        */

    parent.add(node);

    //css 이펙트를 적용 시키기위한 더미 노드 ,
    var node_control = Pig2d.util.createDummy();
    node_control.type = 'control_dummy';

    //루트 노드에 추가 시키기
    node.add(node_control);
    node.node_control = node_control; //쉽게 찾을수 있도록 참조값 만들기

    if(prefeb.data.animation) {
        //스프라이트 노드 (반전,애니메이션 기능을 수행한다)
        var node_sprite = Pig2d.util.createSprite(
            prefeb.data
        );
        node_sprite.type = 'sprite';
        node_sprite.prefeb = prefeb;

        //인자들은 기본값은으로 세팅
        node_sprite.get('model').setupAnimation({
            isAnimationLoop: false,
            AnimationStatus : 'stop'

        });
        node_control.add(node_sprite);

        node.node_sprite = node_sprite; //쉽게 찾을수 있도록 참조값 만들기

        //툴에서 해당 노드의 캔버스 앨리먼트 클릭시 노드를 쉽게 찾을수 있도록 참조값 만들어준다.
        node_sprite.get('model').get('sheet').target_node = node;


    }
    else { //통이미지 스프라이트
        var node_sprite = Pig2d.util.createSlicedImage({
            imgObj: prefeb.data.texture
        });

        node_sprite.type = 'image';
        node_sprite.prefeb = prefeb;

        node_control.add(node_sprite);

        node.node_sprite = node_sprite; //쉽게 찾을수 있도록 참조값 만들기

    }

    //this.toolSetup(node);

    return node;
}