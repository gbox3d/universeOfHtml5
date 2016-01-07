/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Myclass.Page2view = Myclass.Viewbase.extend({
    initialize: function() {
        _.bindAll(this, 'load_page', 'setup_event');
        this.load_page();
    },
    //load_page에서 콜백 되어짐 
    setup_event: function() {
        //console.log('page1 setup event');
        Myclass.Viewbase.prototype.setup_event.call(this);
        
        var superself = this;

        $('#btn-test', $(this.el)).on('vmousedown', function() {
            console.log('click');
            $('#log', $(superself.el)).append($('<p>test</p>'));
        });

    }
});
