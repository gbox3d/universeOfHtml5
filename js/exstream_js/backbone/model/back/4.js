function start() {
    Person = Backbone.Model.extend({
        initialize: function() {
            console.log('wellcome' + this.get('name'));
            /*
             * 리스너 설정 예 
             */
            this.bind("change:name", function() {
                console.log('change : ' + this.get('name'));
            });
            this.bind('error',function(model,error) {
                console.log('error occur~');
                console.log(model);
                console.log(error);
            })

        },
        defaults: {
            name: 'lsz',
            age: 42,
            children: []
        },
        replaceNameAttr: function(_name) {
            this.set({name:_name});
        },
        validate : function(attributes) {
          if(attributes.age < 0) {
              return 'u cant have negative age!';
          }  
        }
    });
    var person = new Person();
    person.set({name: 'tommy'});
    console.log(person.get('name'));
    person.set({age:-2});
    

}

