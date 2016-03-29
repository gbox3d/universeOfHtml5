/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function start() {
    var Person = Backbone.Model.extend({
        initialize: function(data) {
            console.log('welcome backbone');
            console.log('hello ' + data.name);
        }
    });
    var person = new Person({name:'tom',age:27});
    console.log(person.toJSON());
    console.log(person.attributes);
    
}