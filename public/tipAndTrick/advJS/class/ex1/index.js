import { User } from './user.js'

try {
    document.addEventListener('DOMContentLoaded', function (event) {
        let dorocy = new User('dorocy', document.getElementById('container'));
        dorocy.sayHi();
    })

}
catch (e) {

    console.log(e instanceof ReferenceError)
    console.log(e.message);

    let dorocy = new User('dorocy');
    dorocy.sayHi();

}
