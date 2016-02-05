/**
 * Created by gbox3d on 2014. 3. 24..
 */

define(
    function() {

        var this_dom,callback;

        return {
            setup : function(name) {

                this_dom = document.querySelector("#amd-popup-" + name);

                this_dom.querySelector('#btn-ok').addEventListener('click',function() {

                    callback(this_dom.querySelector('#usr').value);

                    $(this_dom.querySelector('.modal')).modal('hide');
                } )

            },
            show : function(option) {

                this_dom.querySelector('#usr').value = option.usr_name;
                callback = option.callback;
                $(this_dom.querySelector('.modal')).modal();

            },
            hide :function(param) {

                $(this_dom).modal('hide');

            }
        };
    }
);