/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Myclass = {};

Myclass.Viewbase = Backbone.View.extend({
    initialize: function() {
        _.bindAll(this, 'load_page', 'setup_event');
        this.load_page();

    }, //initialize end

    load_page: function() {
        var superself = this;

        $.ajax({
            url: this.options.page_templete,
            type: 'GET',
            dataType: 'html',
            success: function(data, textStatus, jqXHR) {
                console.log('init' + superself.options.page_id);

                superself.el = $(data);

                $('body').append($(superself.el));
                $(superself.el).attr('id', superself.options.page_id);

                //console.log('success load ' + superself.id);
                superself.setup_event();

            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            complete: function(jqXHR, textStatus) {
                if (superself.options.cb_pageload_complete != undefined)
                    superself.options.cb_pageload_complete(textStatus);

            }
        }); //ajax end
    },
    setup_event: function() {
        //이벤트 핸들러 초기화
        $(':jqmData(role="navbar") ul li a', $(this.el)).on('vclick', function(event) {
            return false;
        });
        $(":jqmData(role='footer') div ul li a", $(this.el)).on('vmousedown', function(evt) {
            var pagehash = $(this).attr('href');
            console.log(pagehash);

            if (pagehash != undefined) {
                $.mobile.changePage(pagehash, {
                    transition: 'none'
                });
            }

            return false;
        });

    } // setup_event end 
    
});


