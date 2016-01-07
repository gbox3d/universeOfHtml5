/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



Myclass.Page1view = Myclass.Viewbase.extend({
    initialize: function() {
        //_.bindAll(this, 'load_page', 'setup_event');
        this.load_page();

    }, //initialize end
    load_page: function() {
        //슈퍼콜
        Myclass.Viewbase.prototype.load_page.call(this);
    },
    setup_event: function() {
        console.log('page1 setup event');
        Myclass.Viewbase.prototype.setup_event.call(this);
    }

});
