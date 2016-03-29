/* 
 
 * * 상속 예제
 */


function start() {
    Person = Backbone.Model.extend({
        initialize: function(data) {
            console.log('init person');

        },
        test: function() {
            console.log('test!' + this.attributes.name);
        },
        test2: function() {
            console.log('person test!' + this.attributes.name);
        }
    });

    Soldier = Person.extend({
        initialize: function(data) {
            console.log('init soldier');
        },
        test2: function() {
            console.log('Soldier test!' + this.attributes.name);
        }

    });
    
    var soldier = new Soldier({name: 'tom', age: 27});

    soldier.test();
    soldier.test2();
    
    var person = new Person({name: 'jery', age: 27});
    person.test2();

}