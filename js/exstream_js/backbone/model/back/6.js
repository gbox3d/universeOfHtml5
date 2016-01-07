/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function start() {
    Person = Backbone.Model.extend({
        initialize: function(data) {
            
            console.log('welcome backbone');
            console.log('hello ' + data.name);
            console.log('u are ' + this.get('age') + ' years old');
            console.log('test :' + this.test);
        },
        default: {
            name: 'jeny',
            age: 16,
            test: 999
        }


    });
    var person = new Person({name: 'tom', age: 27, test: 666});
    console.log(person);

}