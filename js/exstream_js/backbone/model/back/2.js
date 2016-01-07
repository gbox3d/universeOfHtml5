/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function start() {
    Person = Backbone.Model.extend({
        initialize:function() {
            console.log('wellcome');
        }
        
    });
    var person = new Person({name:'tom',age:37,children:['lyn']});
    console.log(person.get('name'));
    console.log(person.get('children'));
   
    
    
}

