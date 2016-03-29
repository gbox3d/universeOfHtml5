function start() {
    Person = Backbone.Model.extend({
        initialize: function() {
            console.log('wellcome' + this.get('name'));
        },
        defaults: {
            name: 'lsz',
            age: 42,
            children: []
        },
        adopt: function(newchildName) {
            var child_array = this.get('children');
            child_array.push(newchildName);
        }

    });
    var person = new Person();
    person.set({name:'tommy'});
    person.adopt('piter');
    console.log(person.get('name'));
    console.log(person.get('children'));



}

