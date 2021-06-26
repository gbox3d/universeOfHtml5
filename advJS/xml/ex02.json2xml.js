import xmljs from 'xml-js';

let _json = {
    node : {
        _attributes : {
            type : 'module'
        },
        title : {
            _text : 'one day'
        },
        todo : [
            {_text : "work"},
            {_text : "play"},
            {_text : "sleep"}
        ]
    }
};

let _xml = xmljs.json2xml(_json,{compact:true})

console.log(_xml)