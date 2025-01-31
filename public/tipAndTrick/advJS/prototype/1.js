function person(name,weight) {

    this.name = name 
    let _weight = weight

    person.prototype.printWeight = ()=> { //프라이빗 변수 다루기 
        console.log(_weight)
    }
}

person.prototype.printName = function()  //프로토 타입에는 애로우 펑션을 사용하면 this를 사용할수없다.
{
    console.log(this.name)
}

var tommy = new person('tommy',74)

tommy.printName()
tommy.printWeight()

console.log(tommy)