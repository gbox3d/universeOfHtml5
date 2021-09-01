class User {
    constructor(name,container) {
        this.name = name;
        this.container = container;
    }
    sayHi() {
        console.log(`hi ${this.name}`);

        if(this.container) {
            let item = document.createElement('p')
            item.innerText = `hi ${this.name}`
            this.container.appendChild(item)

        }
    }
}

/*
//사용예 
let dorocy = new User('dorocy');
dorocy.sayHi();
*/

export {User}