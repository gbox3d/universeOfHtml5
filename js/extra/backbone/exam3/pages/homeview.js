/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Myclass.HomeView = Myclass.Viewbase.extend({
    initialize : function(param) {
        
        this.el = $('#' + param.page_id);
        console.log(this.el);
        this.setup_event();
    }
});
